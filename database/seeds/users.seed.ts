import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../models/user.model';

export default class UsersSeed implements Seeder {
  public async run(factory: Factory) {
    await factory(User)().createMany(10, {
      username: Factory.each((i) => `user${i}`),
      email: Factory.each((i) => `user${i}@example.com`),
      password: Factory.each(() => 'password123'),
    });
  }
}
