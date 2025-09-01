// src/submission/submission.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submission.entity';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Quiz, User])],
  providers: [],
  controllers: [],
})
export class SubmissionModule {}