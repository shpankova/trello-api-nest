import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text')
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }
}
