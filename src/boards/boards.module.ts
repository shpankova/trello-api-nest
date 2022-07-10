import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
