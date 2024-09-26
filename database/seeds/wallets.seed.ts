import { Factory, Seeder } from 'typeorm-seeding';
import { Wallet } from '../models/wallet.model';
import { User } from '../models/user.model';

export default class WalletsSeed implements Seeder {
  public async run(factory: Factory) {
    const users = await User.find();
    await factory(Wallet)().createMany(users.length, {
      name: Factory.each((i) => `Wallet ${i}`),
      description: Factory.each((i) => `This is wallet ${i}`),
      balance: Factory.each(() => 1000),
      user: Factory.each((i) => users[i]),
    });
  }
}
