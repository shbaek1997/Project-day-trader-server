import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {}
  findUserByEmail(email: string) {
    const foundUser = this.userRepository.findOneBy({ email });
    return foundUser;
  }
  createUser(createUserDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...createUserDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
}
