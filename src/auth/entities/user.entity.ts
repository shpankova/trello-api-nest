import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokensEntity } from './rt.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  role: string;

  @OneToMany(
    () => RefreshTokensEntity,
    (refreshToken: RefreshTokensEntity) => refreshToken.user,
  )
  refreshTokens: RefreshTokensEntity[];
}
