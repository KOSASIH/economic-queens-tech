import { Test, TestingModule } from '@nestjs/testing';
import { EmpowHerNet } from './EmpowHerNet';
import { BlockchainService } from './blockchain.service';
import { Transaction } from './transaction.entity';

describe('EmpowHerNet', () => {
  let empowHerNet: EmpowHerNet;
  let blockchainService: BlockchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpowHerNet, BlockchainService],
    }).compile();

    empowHerNet = module.get<EmpowHerNet>(EmpowHerNet);
    blockchainService = module.get<BlockchainService>(BlockchainService);
  });

  it('should be defined', () => {
    expect(empowHerNet).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should create a new transaction', async () => {
      const transaction: Transaction = {
        from: '0x1234567890abcdef',
        to: '0x9876543210fedcba',
        value: 10,
      };

      const result = await empowHerNet.createTransaction(transaction);
      expect(result).toEqual(transaction);
    });
  });

  describe('getTransaction', () => {
    it('should return a transaction by id', async () => {
      const transaction: Transaction = {
        id: '1',
        from: '0x1234567890abcdef',
        to: '0x9876543210fedcba',
        value: 10,
      };

      const result = await empowHerNet.getTransaction('1');
      expect(result).toEqual(transaction);
    });
  });

  describe('getTransactions', () => {
    it('should return a list of transactions', async () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          from: '0x1234567890abcdef',
          to: '0x9876543210fedcba',
          value: 10,
        },
        {
          id: '2',
          from: '0x9876543210fedcba',
          to: '0x1234567890abcdef',
          value: 20,
        },
      ];

      const result = await empowHerNet.getTransactions();
      expect(result).toEqual(transactions);
    });
  });

  describe('mineBlock', () => {
    it('should mine a new block', async () => {
      const block = await empowHerNet.mineBlock();
      expect(block).toBeDefined();
    });
  });

  describe('getBlockchain', () => {
    it('should return the blockchain', async () => {
      const blockchain = await empowHerNet.getBlockchain();
      expect(blockchain).toBeDefined();
    });
  });
});
