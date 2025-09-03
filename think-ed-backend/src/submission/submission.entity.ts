// src/submission/submission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.submissions, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.submissions, { onDelete: 'CASCADE' })
  student: User; // ✅ Renombrado para que coincida con la solicitud

  @CreateDateColumn({ type: 'timestamp' })
  submitted_at: Date;
}