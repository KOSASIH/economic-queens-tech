import { Test, TestingModule } from '@nestjs/testing';
import { Marketplace } from './marketplace .entity';
import { MarketplaceService } from './marketplace.service';

describe('MarketplaceModel', () => {
  let marketplace: Marketplace;

  beforeEach(() => {
    marketplace = new Marketplace('EmpowHerNet Marketplace', 'This is a marketplace for entrepreneurship');
  });

  it('should be defined', () => {
    expect(marketplace).toBeDefined();
  });

  describe('name', () => {
    it('should have a name', () => {
      expect(marketplace.name).toBe('EmpowHerNet Marketplace');
    });
  });

  describe('description', () => {
    it('should have a description', () => {
      expect(marketplace.description).toBe('This is a marketplace for entrepreneurship');
    });
  });
});
