import { Controller, Post, Body, Get, Param, Put, Delete, Inject } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDTO } from './dto/create-wallet.dto';
import { UpdateWalletDTO } from './dto/update-wallet.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { PiCoinService } from '../pi-coin/pi-coin.service';

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService, @Inject(PiCoinService) private readonly piCoinService: PiCoinService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiResponse({ status: 201, description: 'Wallet created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(Roles.USER)
  async createWallet(@Body() createWalletDTO: CreateWalletDTO) {
    const wallet = await this.walletService.createWallet(createWalletDTO);
    await this.piCoinService.generatePiCoinAddress(wallet.id);
    return wallet;
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiResponse({ status: 200, description: 'Wallets retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No wallets found' })
  @Auth(Roles.ADMIN)
  async getWallets() {
    return this.walletService.getWallets();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet by ID' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  @Auth(Roles.USER)
  async getWallet(@Param('id') id: string) {
    return this.walletService.getWallet(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a wallet' })
  @ApiResponse({ status: 200, description: 'Wallet updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(Roles.USER)
  async updateWallet(@Param('id') id: string, @Body() updateWalletDTO: UpdateWalletDTO) {
    return this.walletService.updateWallet(id, updateWalletDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet' })
  @ApiResponse({ status: 204, description: 'Wallet deleted successfully' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  @Auth(Roles.ADMIN)
  async deleteWallet(@Param('id') id: string) {
    await this.piCoinService.deletePiCoinAddress(id);
    return this.walletService.deleteWallet(id);
  }
}
