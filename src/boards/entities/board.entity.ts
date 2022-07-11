import { CardEntity } from 'src/cards/entities/card.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  board_id: number;

  @Column('text')
  name: string;

  @Column('text')
  color: string;

  @Column('text')
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @OneToMany(() => CardEntity, (cards: CardEntity) => cards.board_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  cards: Array<CardEntity>;
}
