import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.gurard';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    //DTO에서 detailParams로 convert 해야함
    const { email, nickname, password, confirmPassword } = createUserDto;
    //단계 1. email로 가입되어있는지 확인 - 아마도 service의 findUserByEmail같은 것을 만들기.
    const foundUser = await this.userService.findUserByEmail(email);
    console.log(foundUser);
    //user를 이메일 validation또한 넣을까?
    const isEmailValid = foundUser === null ? true : false;
    if (!isEmailValid) {
      throw Error('An account already exists with your email address');
    }
    const isPasswordValid = password.length >= 8;
    if (!isPasswordValid) {
      throw Error('Password should be at least 8 characters!');
    }
    //단계 2. password와 confirmPassword가 같은지 확인, 비밀번호 길이 수를 확인
    const isPasswordEqual = password === confirmPassword;
    if (!isPasswordEqual) {
      throw Error('Password and repeat password do not match');
    }
    //단계 3. password를 bcrypt같은 것을 활용하여 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 단계 4. createUser에 맞는 CreateUserParams에 맞는 형식으로 객체를 전달
    const createdUser = await this.userService.createUser({
      email,
      nickname,
      password: hashedPassword,
    });
    return createdUser;
  }
}
