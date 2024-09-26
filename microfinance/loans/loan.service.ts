import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.model';
import { Borrower } from '../borrowers/borrower.model';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,
  ) {}

  async createLoan(loan: Loan): Promise<Loan> {
    return this.loanRepository.save(loan);
  }

  async getLoans(): Promise<Loan[]> {
    return this.loanRepository.find();
  }

  async getLoan(id: string): Promise<Loan> {
    return this.loanRepository.findOne(id);
  }

  async updateLoan(id: string, loan: Loan): Promise<Loan> {
    const existingLoan = await this.getLoan(id);
    if (!existingLoan) {
      throw new Error('Loan not found');
    }
    return this.loanRepository.save({ ...existingLoan, ...loan });
  }

  async deleteLoan(id: string): Promise<void> {
    const loan = await this.getLoan(id);
    if (!loan) {
      throw new Error('Loan not found');
    }
    await this.loanRepository.delete(id);
  }

  async getBorrowers(loanId: string): Promise<Borrower[]> {
    const loan = await this.getLoan(loanId);
    if (!loan) {
      throw new Error('Loan not found');
    }
    return this.borrowerRepository.find({ where: { loans: loan } });
  }
}
