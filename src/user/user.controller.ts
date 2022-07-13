import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserInput): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Post('sighin')
  async signIn(@Body() user: CreateUserInput): Promise<string> {
    return this.userService.signIn(user);
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.userService.updateUserById(id, updateUserInput);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.deleteUserById(id);
  }
}
