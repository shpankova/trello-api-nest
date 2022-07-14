import { BoardEntity } from 'src/boards/entities/board.entity';
import { CardEntity } from 'src/cards/entities/card.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '61665786',
  database: 'trello-api-docker',
  entities: [BoardEntity, CardEntity, UserEntity],
  migrations: ['dist/migration/*.js'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true,
  logging: true,
};
export default databaseConfig;
