import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: String, nullable: true })
  hashedRt: string | null;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }
}
