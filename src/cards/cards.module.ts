import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
