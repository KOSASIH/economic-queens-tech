import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.username = createUserDTO.username;
    user.email = createUserDTO.email;
    user.password = await bcrypt.hash(createUserDTO.password, 10);
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.getUser(id);
    user.username = updateUserDTO.username;
    user.email = updateUserDTO.email;
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await this.userRepository.delete(user.id);
  }

  async login(userDTO: any): Promise<any> {
    const user = await this.userRepository.findOne({ email: userDTO.email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isValidPassword = await bcrypt.compare(userDTO.password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
