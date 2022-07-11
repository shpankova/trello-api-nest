import { BoardEntity } from 'src/boards/entities/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn()
  card_id: number;

  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.cards, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board_id: BoardEntity;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('text')
  estimate: string;

  @Column('text')
  status: string;

  @Column('timestamp with time zone')
  due_date: string;

  @Column('text')
  labels: string;
}
