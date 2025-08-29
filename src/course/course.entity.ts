// src/course/course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Module } from '../module/module.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  price: number;

  @Column()
  category: string;

  @Column({ default: 'Draft' })
  status: string; // Draft, Published, Archived

  @ManyToOne(() => User, user => user.courses)
  instructor: User;

  @OneToMany(() => Module, module => module.course)
  modules: Module[];
}