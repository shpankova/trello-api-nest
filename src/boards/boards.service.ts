import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './inputs/create-boards.input';
import { UpdateBoardInput } from './inputs/update-board.input';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async createBoard(createBoardInput: CreateBoardInput): Promise<BoardEntity> {
    return await this.boardRepository.save({ ...createBoardInput });
  }

  async findAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async findBoardById(board_id: number): Promise<BoardEntity> {
    return await this.boardRepository.findOne({ where: { board_id } });
  }

  async updateBoardById(
    updateBoardInput: UpdateBoardInput,
  ): Promise<BoardEntity> {
    await this.boardRepository.update(
      { board_id: updateBoardInput.board_id },
      { ...updateBoardInput },
    );
    return await this.findBoardById(updateBoardInput.board_id);
  }

  async deleteBoard(board_id: number): Promise<BoardEntity> {
    const board = await this.boardRepository
      .createQueryBuilder()
      .delete()
      .where({ board_id })
      .returning('*')
      .execute();

    return board.raw[0];
  }
}
