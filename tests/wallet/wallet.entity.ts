export class Wallet {
  id: number;
  name: string;
  balance: number;
  createdAt: string;

  constructor(name: string, balance: number, createdAt: string) {
    this.name = name;
    this.balance = balance;
    this.createdAt = createdAt;
  }
}
