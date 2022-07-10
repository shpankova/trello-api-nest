import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './inputs/create-boards.input';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async createBoard(boardInput: CreateBoardInput): Promise<BoardEntity> {
    return await this.boardRepository.save({ ...boardInput });
  }
}
