import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = await app.get(ConfigService);
  const PORT = config.get<number>('PORT');
  const HOST = config.get<string>('HOST');

  await app.listen(PORT, HOST);

  Logger.log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
