import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { UpdateCardDto } from './dto/update-cards.dto';
import { GetCurrentUserId } from 'src/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCard(@Body() dto: CreateCardDto) {
    return await this.cardService.createCard(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findCardById(@Param('id', ParseIntPipe) id: number) {
    return await this.cardService.findCardById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateCard(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCardDto,
  ) {
    return await this.cardService.updateCardById(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCard(@Param('id', ParseIntPipe) id: number) {
    return await this.cardService.deleteCard(id);
  }
}
