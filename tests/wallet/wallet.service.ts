import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  private wallets: Wallet[] = [];

  createWallet(wallet: Wallet): Promise<Wallet> {
    this.wallets.push(wallet);
    return Promise.resolve(wallet);
  }

  getWallet(id: number): Promise<Wallet | null> {
    return Promise.resolve(this.wallets.find((wallet) => wallet.id === id));
  }

  getWallets(): Promise<Wallet[]> {
    return Promise.resolve(this.wallets);
  }

  updateWallet(wallet: Wallet): Promise<Wallet> {
    const index = this.wallets.findIndex((w) => w.id === wallet.id);
    if (index !== -1) {
      this.wallets[index] = wallet;
    }
    return Promise.resolve(wallet);
  }

  deleteWallet(id: number): Promise<void> {
    this.wallets = this.wallets.filter((wallet) => wallet.id !== id);
    return Promise.resolve();
  }
}
