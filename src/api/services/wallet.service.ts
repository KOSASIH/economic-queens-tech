import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './models/wallet.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateWalletDTO } from './dto/create-wallet.dto';
import { UpdateWalletDTO } from './dto/update-wallet.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PiCoinService } from '../pi-coin/pi-coin.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly piCoinService: PiCoinService,
  ) {}

  async createWallet(createWalletDTO: CreateWalletDTO): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.name = createWalletDTO.name;
    wallet.description = createWalletDTO.description;
    wallet.balance = createWalletDTO.balance;
    return this.walletRepository.save(wallet);
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async getWallet(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(id);
    if (!wallet) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return wallet;
  }

  async updateWallet(id: string, updateWalletDTO: UpdateWalletDTO): Promise<Wallet> {
    const wallet = await this.getWallet(id);
    wallet.name = updateWalletDTO.name;
    wallet.description = updateWalletDTO.description;
    wallet.balance = updateWalletDTO.balance;
    return this.walletRepository.save(wallet);
  }

  async deleteWallet(id: string): Promise<void> {
    const wallet = await this.getWallet(id);
    await this.walletRepository.delete(wallet.id);
  }

  async generatePiCoinAddress(walletId: string): Promise<string> {
    const wallet = await this.getWallet(walletId);
    const piCoinAddress = await this.piCoinService.generatePiCoinAddress();
    wallet.piCoinAddress = piCoinAddress;
    await this.walletRepository.save(wallet);
    return piCoinAddress;
  }
}
