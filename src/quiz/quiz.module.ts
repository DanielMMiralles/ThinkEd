// src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Lesson } from '../lesson/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Lesson])],
  providers: [],
  controllers: [],
})
export class QuizModule {}