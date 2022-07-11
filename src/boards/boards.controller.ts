import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './inputs/create-boards.input';
import { UpdateBoardInput } from './inputs/update-board.input';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() boardInput: CreateBoardInput) {
    return this.boardsService.createBoard(boardInput);
  }

  @Get()
  getAll() {
    return this.boardsService.findAllBoards();
  }

  @Get('/:board_id')
  getById(@Param('board_id') board_id: number) {
    return this.boardsService.findBoardById(board_id);
  }

  @Put('/:board_id')
  update(@Body() boardInput: UpdateBoardInput) {
    return this.boardsService.updateBoardById(boardInput);
  }

  @Delete('/:board_id')
  delete(@Param('board_id') board_id: number) {
    return this.boardsService.deleteBoard(board_id);
  }
}
