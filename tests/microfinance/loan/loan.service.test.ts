import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { Loan } from './loan.entity';

describe('LoanService', () => {
  let loanService: LoanService;
  let loan: Loan;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
    }).compile();

    loanService = module.get<LoanService>(LoanService);
    loan = new Loan('Personal Loan', 1000, '2024-09-26', '2025-09-26', 'EmpowHerNet Microfinance');
  });

  it('should be defined', () => {
    expect(loanService).toBeDefined();
  });

  describe('createLoan', () => {
    it('should create a new loan', async () => {
      const result = await loanService.createLoan(loan);
      expect(result).toBe(loan);
    });
  });

  describe('getLoan', () => {
    it('should return a loan by id', async () => {
      const result = await loanService.getLoan(loan.id);
      expect(result).toBe(loan);
    });
  });

  describe('getLoans', () => {
    it('should return a list of loans', async () => {
      const loans = await loanService.getLoans();
      expect(loans).toContain(loan);
    });
  });
});
