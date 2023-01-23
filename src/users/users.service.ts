import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      return user;
    } catch (error) {
      console.log('Error', error);
    }
  }
  async getAll() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      console.log('Error', error);
    }
  }
}
