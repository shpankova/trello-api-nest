import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { UpdateCardDto } from './dto/update-cards.dto';
import axios from 'axios';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
  ) {}

  async createCard(dto: CreateCardDto): Promise<CardEntity> {
    const card = await this.cardRepository.findBy({
      card_id: dto.card_id,
    });

    if (card[0]) {
      throw new BadRequestException('Card exists');
    }
    return await this.cardRepository.save({ ...dto });
  }

  async findCardById(card_id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { card_id } });

    if (!card) {
      throw new BadRequestException('Nothing was found');
    }

    return card;
  }

  async updateCardById(
    id: number,
    card_id: number,
    dto: UpdateCardDto,
  ): Promise<CardEntity> {
    await this.cardRepository.update({ card_id }, { ...dto });
    const card = await this.findCardById(card_id);
    if (!card) {
      throw new BadRequestException('Nothing was found');
    }
    const user = await this.authRepository.findOne({
      where: { id },
    });
    axios.post(
      `http://127.0.0.1:3000/mail/cardemail?email=${user.email}&cardname=${card.name}`,
    );
    return card;
  }

  async deleteCard(card_id: number): Promise<CardEntity> {
    const board = await this.cardRepository
      .createQueryBuilder()
      .delete()
      .where({ card_id })
      .returning('*')
      .execute();

    return board.raw[0];
  }
}
