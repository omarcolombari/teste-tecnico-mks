import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class MovieEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column()
  duration: number;

  @Column()
  classification: string;

  @Column()
  synopsis: string;

  @Column()
  genres: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  private generateId() {
    this.id = v4();
  }
}
