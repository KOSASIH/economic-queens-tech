import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.model';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async createDevice(device: Device): Promise<Device> {
    return this.deviceRepository.save(device);
  }

  async getDevices(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  async getDevice(id: string): Promise<Device> {
    return this.deviceRepository.findOne(id);
  }

  async updateDevice(id: string, device: Device): Promise<Device> {
    const existingDevice = await this.getDevice(id);
    if (!existingDevice) {
      throw new Error('Device not found');
    }
    return this.deviceRepository.save({ ...existingDevice, ...device });
  }

  async deleteDevice(id: string): Promise<void> {
    const device = await this.getDevice(id);
    if (!device) {
      throw new Error('Device not found');
    }
    await this.deviceRepository.delete(id);
  }
}
