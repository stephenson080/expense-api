import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './userDTO';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }
  async createUser(user: CreateUserDTO) {
    const newuser = this.userRepo.create(user);
    return await this.userRepo.save(newuser);
  }
  async getUser(userId: string){
    const user = await this.userRepo.findOne({where: {user_id: userId}, relations: {reports: true}} )
    return user
  }
}
