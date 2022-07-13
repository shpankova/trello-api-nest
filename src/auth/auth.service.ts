import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateJWT(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePassword(newPassword: string, passwordHash: string): boolean {
    return bcrypt.compareSync(newPassword, passwordHash);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    try {
      const findUser: UserEntity = await this.userService.findUserByEmail(
        email,
      );
      if (!this.comparePassword(password, findUser.password)) return null;
      return findUser;
    } catch (err) {
      console.log(err);
    }
  }
}
