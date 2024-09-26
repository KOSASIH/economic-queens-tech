import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  deviceType: string;

  @Column()
  deviceId: string;

  @Column()
  deviceModel: string;

  @Column()
  firmwareVersion: string;

  @Column()
  softwareVersion: string;

  @Column()
  hardwareVersion: string;

  @Column()
  serialNumber: string;

  @Column()
  macAddress: string;

  @Column()
  ipAddress: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
