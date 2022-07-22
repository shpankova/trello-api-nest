import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import axios from 'axios';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
  ) {}

  async createBoard(dto: CreateBoardDto): Promise<BoardEntity> {
    const board = await this.boardRepository.findBy({
      board_id: dto.board_id,
    });

    if (board[0]) {
      throw new BadRequestException('Board exists');
    }

    return await this.boardRepository.save({ ...dto });
  }

  async findAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async findBoardById(board_id: number): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne({ where: { board_id } });

    if (!board) {
      throw new BadRequestException('Nothing was found');
    }

    return board;
  }

  async updateBoardById(
    id: number,
    board_id: number,
    dto: UpdateBoardDto,
  ): Promise<BoardEntity> {
    await this.boardRepository.update({ board_id }, { ...dto });
    const user = await this.authRepository.findOne({
      where: { id },
    });
    const board = await this.findBoardById(board_id);
    axios.post(
      `http://127.0.0.1:3000/mail/boardemail?email=${user.email}&boardname=${board.name}`,
    );
    return board;
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
