import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BoardsModule,
    CardsModule,
    AuthModule,
  ],
})
export class AppModule {}
