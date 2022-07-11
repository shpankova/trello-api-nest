import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CardsService } from './cards.service';
import { CreateCardInput } from './inputs/create-cards.input';
import { UpdateCardInput } from './inputs/update-cards.input';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  async create(
    @Body() cardInput: CreateCardInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const card = await this.cardService.createCard(cardInput);
      res.json({
        message: 'Card added successfully!',
        body: {
          card,
        },
      });
    } catch (err) {
      if (err.message === 'Card exists') {
        throw new BadRequestException('This board already exists');
      } else {
        next(err);
      }
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const card = await this.cardService.findCardById(id);
      res.json({
        message: 'Card found successfully!',
        body: { card },
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
  async update(
    @Param('id') id: number,
    @Body() cardInput: UpdateCardInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const card = await this.cardService.updateCardById(id, cardInput);
      res.status(200).send({
        message: 'Card Updated Successfully!',
        body: { card },
      });
    } catch (err) {
      next(err);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const card = await this.cardService.deleteCard(id);
      res.status(200).send({
        message: 'Card deleted successfully!',
        body: { card },
      });
    } catch (err) {
      next(err);
    }
  }
}
