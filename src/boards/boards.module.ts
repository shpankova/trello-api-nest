import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    BoardsService,
  ],
  controllers: [BoardsController],
})
export class BoardsModule {}
