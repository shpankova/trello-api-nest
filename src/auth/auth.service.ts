import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { Tokens } from './types';
import * as uuid from 'uuid';
import { RefreshTokensEntity } from './entities/rt.entity';

@Injectable()
export class AuthService {
  token = uuid.v4();
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokensEntity)
    private rtRepository: Repository<RefreshTokensEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto): Promise<Tokens> {
    const { email, password, role } = dto;
    const hash = await this.hashData(password);
    const newUser = await this.authRepository.save({
      email,
      password: hash,
      role,
    });
    const tokens = await this.getTokens(newUser.id, newUser.role);
    const rt = await this.parseJwt(tokens.refresh_token);
    const parsedRt = rt.sub;
    await this.saveTokens(newUser.id, parsedRt);
    return tokens;
  }

  async signin(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;
    const user = await this.authRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new ForbiddenException(`User with email ${email} is not found`);
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect password');
    }
    const tokens = await this.getTokens(user.id, user.role);
    const rt = await this.parseJwt(tokens.refresh_token);
    const parsedRt = rt.sub;
    await this.updateRt(user.id, parsedRt);
    return tokens;
  }

  async logout(userId: number) {
    const user = await this.authRepository.findOne({
      where: { id: userId },
    });
    await this.rtRepository.update({ userId: user.id }, { token: null });
  }

  async refreshTokens(rt: string) {
    const token = await this.rtRepository.findOne({
      where: { token: rt },
    });
    const userId = token.userId;
    const user = await this.authRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    if (token.token !== rt) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.getTokens(user.id, user.role);
    const refreshToken = await this.parseJwt(tokens.refresh_token);
    const parsedRt = refreshToken.sub;
    await this.updateRt(user.id, parsedRt);
    return tokens;
  }

  async saveTokens(userId: number, token: string) {
    await this.rtRepository.save({ userId, token });
  }

  async updateRt(userId: number, token: string) {
    await this.rtRepository.update({ userId: userId }, { token });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(base64);
  }

  async getTokens(userId: number, role: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          role,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: this.token,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
