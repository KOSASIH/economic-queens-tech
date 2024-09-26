import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marketplace } from './marketplace.model';
import { Product } from './products/product.model';
import { Order } from './orders/order.model';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Marketplace)
    private readonly marketplaceRepository: Repository<Marketplace>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createMarketplace(marketplace: Marketplace): Promise<Marketplace> {
    return this.marketplaceRepository.save(marketplace);
  }

  async getMarketplaces(): Promise<Marketplace[]> {
    return this.marketplaceRepository.find();
  }

  async getMarketplace(id: string): Promise<Marketplace> {
    return this.marketplaceRepository.findOne(id);
  }

  async updateMarketplace(id: string, marketplace: Marketplace): Promise<Marketplace> {
    const existingMarketplace = await this.getMarketplace(id);
    if (!existingMarketplace) {
      throw new Error('Marketplace not found');
    }
    return this.marketplaceRepository.save({ ...existingMarketplace, ...marketplace });
  }

  async deleteMarketplace(id: string): Promise<void> {
    const marketplace = await this.getMarketplace(id);
    if (!marketplace) {
      throw new Error('Marketplace not found');
    }
    await this.marketplaceRepository.delete(id);
  }

  async getProducts(marketplaceId: string): Promise<Product[]> {
    const marketplace = await this.getMarketplace(marketplaceId);
    if (!marketplace) {
      throw new Error('Marketplace not found');
    }
    return this.productRepository.find({ where: { marketplace } });
  }

  async getOrders(marketplaceId: string): Promise<Order[]> {
    const marketplace = await this.getMarketplace(marketplaceId);
    if (!marketplace) {
      throw new Error('Marketplace not found');
    }
    return this.orderRepository.find({ where: { marketplace } });
  }
}
