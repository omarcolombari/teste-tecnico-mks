import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  duration: number;

  @Column()
  classification: string;

  @Column()
  synopsis: string;

  @Column()
  genres: string;

  @ManyToOne(() => UserEntity, (user) => user.movies, { eager: true })
  user: UserEntity;

  @Column()
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
