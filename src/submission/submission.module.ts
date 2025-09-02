// src/submission/submission.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submission.entity';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';
import { Question } from '../quiz/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Quiz, User, Question])],
  providers: [SubmissionService],
  controllers: [SubmissionController],
})
export class SubmissionModule {}