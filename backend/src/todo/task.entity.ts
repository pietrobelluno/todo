import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate?: string;

  @Column({ name: 'status', default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
