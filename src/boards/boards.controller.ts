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
import { Role } from 'src/auth/entities/role.enum';
import { GetCurrentUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async createBoard(@Body() dto: CreateBoardDto) {
    return await this.boardsService.createBoard(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findBoardById(@Param('id', ParseIntPipe) id: number) {
    return await this.boardsService.findBoardById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async updateBoard(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBoardDto,
  ) {
    return await this.boardsService.updateBoardById(userId, id, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return await this.boardsService.deleteBoard(id);
  }
}
