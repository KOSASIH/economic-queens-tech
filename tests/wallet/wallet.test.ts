import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

describe('Wallet Service', () => {
  let walletService: WalletService;
  let wallet: Wallet;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    wallet = new Wallet('EmpowHerNet Wallet', 1000, '2024-09-26');
  });

  it('should be defined', () => {
    expect(walletService).toBeDefined();
  });

  describe('createWallet', () => {
    it('should create a new wallet', async () => {
      const result = await walletService.createWallet(wallet);
      expect(result).toBe(wallet);
    });
  });

  describe('getWallet', () => {
    it('should return a wallet by id', async () => {
      const result = await walletService.getWallet(wallet.id);
      expect(result).toBe(wallet);
    });
  });

  describe('getWallets', () => {
    it('should return a list of wallets', async () => {
      const wallets = await walletService.getWallets();
      expect(wallets).toContain(wallet);
    });
  });

  describe('updateWallet', () => {
    it('should update a wallet', async () => {
      wallet.name = 'Updated EmpowHerNet Wallet';
      const result = await walletService.updateWallet(wallet);
      expect(result).toBe(wallet);
    });
  });

  describe('deleteWallet', () => {
    it('should delete a wallet', async () => {
      await walletService.deleteWallet(wallet.id);
      expect(await walletService.getWallet(wallet.id)).toBeNull();
    });
  });
});
