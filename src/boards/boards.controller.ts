import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './inputs/create-boards.input';

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
}
