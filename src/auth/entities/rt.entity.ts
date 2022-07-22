import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('refreshTokens')
export class RefreshTokensEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.refreshTokens)
  user: UserEntity;

  @Column('int')
  userId: number;

  @Column('varchar', { nullable: true })
  token: string | null;
}
