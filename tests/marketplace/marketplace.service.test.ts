import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from './marketplace.service';
import { Marketplace } from './marketplace.entity';

describe('MarketplaceService', () => {
  let marketplaceService: MarketplaceService;
  let marketplace: Marketplace;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketplaceService],
    }).compile();

    marketplaceService = module.get<MarketplaceService>(MarketplaceService);
    marketplace = new Marketplace('EmpowHerNet Marketplace', 'This is a marketplace for entrepreneurship');
  });

  it('should be defined', () => {
    expect(marketplaceService).toBeDefined();
  });

  describe('createMarketplace', () => {
    it('should create a new marketplace', async () => {
      const result = await marketplaceService.createMarketplace(marketplace);
      expect(result).toBe(marketplace);
    });
  });

  describe('getMarketplace', () => {
    it('should return a marketplace by id', async () => {
      const result = await marketplaceService.getMarketplace(marketplace.id);
      expect(result).toBe(marketplace);
    });
  });

  describe('getMarketplaces', () => {
    it('should return a list of marketplaces', async () => {
      const marketplaces = await marketplaceService.getMarketplaces();
      expect(marketplaces).toContain(marketplace);
    });
  });
});
