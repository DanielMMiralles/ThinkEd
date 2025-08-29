// src/lesson/lesson.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Module } from '../module/module.entity'; 

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  videoUrl: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Module, (module) => module.lessons)
  module: Module;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}