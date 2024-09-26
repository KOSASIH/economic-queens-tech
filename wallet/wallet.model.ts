import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
 import { Transaction } from './transactions/transaction.model';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];
}
