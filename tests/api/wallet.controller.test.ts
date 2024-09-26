import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createWallet', () => {
    it('should create a new wallet', async () => {
      const wallet: Wallet = {
        name: 'My Wallet',
        description: 'This is my wallet',
        balance: 100,
      };

      const result = await controller.createWallet(wallet);
      expect(result).toEqual(wallet);
    });
  });

  describe('getWallet', () => {
    it('should return a wallet by id', async () => {
      const wallet: Wallet = {
        id: '1',
        name: 'My Wallet',
        description: 'This is my wallet',
        balance: 100,
      };

      const result = await controller.getWallet('1');
      expect(result).toEqual(wallet);
    });
  });

  describe('updateWallet', () => {
    it('should update a wallet', async () => {
      const wallet: Wallet = {
        id: '1',
        name: 'My New Wallet',
        description: 'This is my new wallet',
        balance: 200,
      };

      const result = await controller.updateWallet('1', wallet);
      expect(result).toEqual(wallet);
    });
  });

  describe('deleteWallet', () => {
    it('should delete a wallet', async () => {
      const result = await controller.deleteWallet('1');
      expect(result).toBeUndefined();
    });
  });
});
