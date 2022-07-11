import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardInput } from './inputs/create-cards.input';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  create(@Body() cardInput: CreateCardInput) {
    return this.cardService.createCard(cardInput);
  }
}
