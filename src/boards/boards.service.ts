import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './inputs/create-board.input';
import { UpdateBoardInput } from './inputs/update-board.input';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    @Inject('MAIL_SERVICE')
    private client: ClientProxy,
  ) {}

  async createBoard(createBoardInput: CreateBoardInput): Promise<BoardEntity> {
    const board = await this.boardRepository.findBy({
      board_id: createBoardInput.board_id,
    });

    if (board[0]) {
      throw new Error('Board exists');
    }

    return await this.boardRepository.save({ ...createBoardInput });
  }

  async findAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async findBoardById(board_id: number): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne({ where: { board_id } });

    if (!board) {
      throw new Error('Nothing was found');
    }

    return board;
  }

  async updateBoardById(
    id: number,
    board_id: number,
    updateBoardInput: UpdateBoardInput,
  ): Promise<BoardEntity> {
    await this.boardRepository.update({ board_id }, { ...updateBoardInput });
    const user = await this.authRepository.findOne({
      where: { id },
    });
    const emailAddress = user.email;
    this.client.emit({ cmd: 'send-message' }, { emailAddress });
    return await this.findBoardById(board_id);
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
