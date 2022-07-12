import { DataSourceOptions } from 'typeorm';
import { BoardEntity } from 'src/boards/entities/board.entity';
import { CardEntity } from 'src/cards/entities/card.entity';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  // host: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '61665786',
  database: 'trello-api-docker',
  entities: [BoardEntity, CardEntity],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true,
  logging: true,
};
export default databaseConfig;
