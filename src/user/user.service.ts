import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async createUser(user: CreateUserInput): Promise<UserEntity> {
    const { username, email, password } = user;
    const findUser: UserEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (findUser) {
      throw new ConflictException('This email already used');
    }
    const hashPassword: string = await this.authService.hashPassword(password);
    return this.userRepository.save({
      username,
      email,
      password: hashPassword,
    });
  }

  async signIn(user: CreateUserInput): Promise<string> {
    const { email, password } = user;
    const findUser: UserEntity = await this.findUserByEmail(email);
    const isPassEquals = await this.authService.comparePassword(
      password,
      findUser.password,
    );
    if (!isPassEquals) throw new UnauthorizedException('Incorrect password');
    return this.authService.generateJWT(
      findUser.id,
      findUser.email,
      findUser.password,
    );
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} is not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} is not found`);
    }
    return user;
  }

  async updateUserById(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    await this.userRepository.update({ id }, { ...updateUserInput });
    return await this.findUserById(id);
  }

  async deleteUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .returning('*')
      .execute();

    return user.raw[0];
  }
}
