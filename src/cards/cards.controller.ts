import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardInput } from './inputs/create-cards.input';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  create(@Body() cardInput: CreateCardInput) {
    return this.cardService.createCard(cardInput);
  }

  @Get(':card_id')
  findById(@Param('card_id') card_id: number) {
    return this.cardService.findCardById(card_id);
  }
}
