import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    BoardsModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
