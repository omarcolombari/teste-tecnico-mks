import { MovieEntity } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => MovieEntity, (movie) => movie.user)
  movies: MovieEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
}
