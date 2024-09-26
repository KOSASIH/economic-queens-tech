import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Entrepreneur } from '../entrepreneurs/entrepreneur.model';

@Entity()
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @OneToMany(() => Entrepreneur, (entrepreneur) => entrepreneur.hub)
  entrepreneurs: Entrepreneur[];
}
