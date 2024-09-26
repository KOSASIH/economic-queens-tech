import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.model';
import { Transaction } from './transactions/transaction.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createWallet(wallet: Wallet): Promise<Wallet> {
    return this.walletRepository.save(wallet);
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async getWallet(id: string): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }

  async updateWallet(id: string, wallet: Wallet): Promise<Wallet> {
    const existingWallet = await this.getWallet(id);
    if (!existingWallet) {
      throw new Error('Wallet not found');
    }
    return this.walletRepository.save({ ...existingWallet, ...wallet });
  }

  async deleteWallet(id: string): Promise<void> {
    const wallet = await this.getWallet(id);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    await this.walletRepository.delete(id);
  }

  async getTransactions(walletId: string): Promise<Transaction[]> {
    const wallet = await this.getWallet(walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return this.transactionRepository.find({ where: { wallet } });
  }

  async createTransaction(walletId: string, transaction: Transaction): Promise<Transaction> {
    const wallet = await this.getWallet(walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    transaction.wallet = wallet;
    return this.transactionRepository.save(transaction);
  }
}
