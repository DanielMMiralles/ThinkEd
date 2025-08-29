// src/module/module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../course/course.entity';
import { Lesson } from '../lesson/lesson.entity';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Course, course => course.modules)
  course: Course;

  @OneToMany(() => Lesson, lesson => lesson.module)
  lessons: Lesson[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}