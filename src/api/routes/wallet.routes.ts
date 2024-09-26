import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletModule } from './wallet.module';
import { RouterModule, Routes } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

const walletRoutes: Routes = [
  {
    path: '',
    module: WalletModule,
    children: [
      {
        path: '',
        controller: WalletController,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forChild(walletRoutes), AuthModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletRoutesModule {}
