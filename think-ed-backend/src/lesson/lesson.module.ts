// src/lesson/lesson.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Module as ModuleEntity } from '../module/module.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, ModuleEntity, Enrollment])],
  providers: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}