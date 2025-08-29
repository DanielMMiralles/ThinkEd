// src/lesson/lesson.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Module } from '../module/module.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  type: string; // video, text, quiz

  @Column()
  order: number;

  @ManyToOne(() => Module, module => module.lessons)
  module: Module;
}