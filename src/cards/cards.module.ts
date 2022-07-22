import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, UserEntity])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
