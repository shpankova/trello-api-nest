import { Body, Controller, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './inputs/create-boards.input';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() boardInput: CreateBoardInput) {
    return this.boardsService.createBoard(boardInput);
  }
}
