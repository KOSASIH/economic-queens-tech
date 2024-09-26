import { Test, TestingModule } from '@nestjs/testing';
import { Loan } from './loan.entity';
import { LoanService } from './loan.service';

describe('LoanModel', () => {
  let loan: Loan;

  beforeEach(() => {
    loan = new Loan('Personal Loan', 1000, '2024-09-26', '2025-09-26', 'EmpowHerNet Microfinance');
  });

  it('should be defined', () => {
    expect(loan).toBeDefined();
  });

  describe('name', () => {
    it('should have a name', () => {
      expect(loan.name).toBe('Personal Loan');
    });
  });

  describe('amount', () => {
    it('should have an amount', () => {
      expect(loan.amount).toBe(1000);
    });
  });

  describe('startDate', () => {
    it('should have a start date', () => {
      expect(loan.startDate).toBe('2024-09-26');
    });
  });

  describe('endDate', () => {
    it('should have an end date', () => {
      expect(loan.endDate).toBe('2025-09-26');
    });
  });

  describe('lender', () => {
    it('should have a lender', () => {
      expect(loan.lender).toBe('EmpowHerNet Microfinance');
    });
  });
});
