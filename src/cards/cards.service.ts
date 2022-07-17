import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { CreateCardInput } from './inputs/create-cards.input';
import { UpdateCardInput } from './inputs/update-cards.input';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async createCard(createCardInput: CreateCardInput): Promise<CardEntity> {
    const card = await this.cardRepository.findBy({
      card_id: createCardInput.card_id,
    });

    if (card[0]) {
      throw new Error('Card exists');
    }
    return await this.cardRepository.save({ ...createCardInput });
  }

  async findCardById(card_id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { card_id } });

    if (!card) {
      throw new Error('Nothing was found');
    }

    return card;
  }

  async updateCardById(
    card_id: number,
    updateCardInput: UpdateCardInput,
  ): Promise<CardEntity> {
    await this.cardRepository.update({ card_id }, { ...updateCardInput });
    const card = await this.findCardById(card_id);
    if (!card) {
      throw new Error('Nothing was found');
    }
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
