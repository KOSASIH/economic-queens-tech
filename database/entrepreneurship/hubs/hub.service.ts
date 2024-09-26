import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hub } from './hub.model';
import { Entrepreneur } from '../entrepreneurs/entrepreneur.model';

@Injectable()
export class HubService {
  constructor(
    @InjectRepository(Hub)
    private readonly hubRepository: Repository<Hub>,
    @InjectRepository(Entrepreneur)
    private readonly entrepreneurRepository: Repository<Entrepreneur>,
  ) {}

  async createHub(hub: Hub): Promise<Hub> {
    return this.hubRepository.save(hub);
  }

  async getHubs(): Promise<Hub[]> {
    return this.hubRepository.find();
  }

  async getHub(id: string): Promise<Hub> {
    return this.hubRepository.findOne(id);
  }

  async updateHub(id: string, hub: Hub): Promise<Hub> {
    const existingHub = await this.getHub(id);
    if (!existingHub) {
      throw new Error('Hub not found');
    }
    return this.hubRepository.save({ ...existingHub, ...hub });
  }

  async deleteHub(id: string): Promise<void> {
    const hub = await this.getHub(id);
    if (!hub) {
      throw new Error('Hub not found');
    }
    await this.hubRepository.delete(id);
  }

  async getEntrepreneurs(hubId: string): Promise<Entrepreneur[]> {
    const hub = await this.getHub(hubId);
    if (!hub) {
      throw new Error('Hub not found');
    }
    return this.entrepreneurRepository.find({ where: { hub } });
  }
}
