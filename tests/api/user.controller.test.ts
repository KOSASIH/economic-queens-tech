import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: User = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const result = await controller.createUser(user);
      expect(result).toEqual(user);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const result = await controller.getUser('1');
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: User = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      };

      const result = await controller.updateUser('1', user);
      expect(result).toEqual(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await controller.deleteUser('1');
      expect(result).toBeUndefined();
    });
  });
});
