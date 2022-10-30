import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService : UserService) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const { password } = user;
    const passwordMatch = await bcrypt.compare(plainPassword, password);
    if (user && passwordMatch) {
      const { nickname, password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
