import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JoiValidatorPipe } from 'src/validation.pipe';
import { BoardsService } from './boards.service';
import { BoardSchema } from './inputs/board.dto';
import { CreateBoardInput } from './inputs/create-board.input';
import { UpdateBoardInput } from './inputs/update-board.input';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(new JoiValidatorPipe(BoardSchema))
  async createBoard(
    @Body() boardInput: CreateBoardInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const board = await this.boardsService.createBoard(boardInput);
      res.json({
        message: 'Board added successfully!',
        body: { board },
      });
    } catch (err) {
      if (err.message === 'Board exists') {
        throw new BadRequestException('This board already exists');
      } else {
        next(err);
      }
    }
  }

  @Get(':id')
  async findBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const board = await this.boardsService.findBoardById(id);
      res.json({
        message: 'Board found successfully!',
        body: { board },
      });
    } catch (err) {
      if (err.message === 'Nothing was found') {
        throw new BadRequestException('Nothing was found');
      } else {
        next(err);
      }
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidatorPipe(BoardSchema))
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() boardInput: UpdateBoardInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const board = await this.boardsService.updateBoardById(id, boardInput);
      res.status(200).send({
        message: 'Board Updated Successfully!',
        body: { board },
      });
    } catch (err) {
      next(err);
    }
  }

  @Delete(':id')
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const board = await this.boardsService.deleteBoard(id);
      res.status(200).send({
        message: 'Board deleted successfully!',
        body: { board },
      });
    } catch (err) {
      next(err);
    }
  }
}
