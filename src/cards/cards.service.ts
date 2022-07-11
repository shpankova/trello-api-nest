import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { CreateCardInput } from './inputs/create-cards.input';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async createCard(createCardInput: CreateCardInput): Promise<CardEntity> {
    const card = await this.cardRepository.save({ ...createCardInput });
    return card;
  }

  async findCardById(card_id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { card_id } });
    return card;
  }
}
