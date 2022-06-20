import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UserResponseDTO } from './userDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }
  async createUser(user: CreateUserDTO) {
    try {
      const newuser = this.userRepo.create(user);
      const savedUser = await this.userRepo.save(newuser);
      return new UserResponseDTO(savedUser)
    } catch (error) {
      throw new UnprocessableEntityException({message: error.message})
    }
  }
  async getUser(userId: string) {
    const user = await this.userRepo.findOne({
      where: { user_id: userId },
      relations: { reports: true },
    });
    return new UserResponseDTO(user);
  }
}
