import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrower } from '../borrowers/borrower.model';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  interestRate: number;

  @Column()
  repaymentTerm: number;

  @Column()
  status: string;

  @OneToMany(() => Borrower, (borrower) => borrower.loans)
  borrowers: Borrower[];
}
