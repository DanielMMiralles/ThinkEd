// src/lesson/lesson.controller.ts
import { Controller, Post, Get, Put, Delete, Body, UseGuards, Request, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './lesson.entity';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('modules/:moduleId/lessons')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('instructor')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async createLesson(
    @Param('moduleId') moduleId: string,
    @Body() createLessonDto: CreateLessonDto,
    @Request() req: RequestWithUser,
  ): Promise<Lesson> {
    return this.lessonService.create(moduleId, createLessonDto, req.user.userId);
  }

  @Get()
  async findModuleLessons(@Param('moduleId') moduleId: string): Promise<Lesson[]> {
    return this.lessonService.findAll(moduleId);
  }

  @Get(':lessonId')
  async findOne(@Param('lessonId') lessonId: string, @Request() req: RequestWithUser): Promise<Lesson> {
    return this.lessonService.findOne(lessonId, req.user.userId);
  }

  @UseGuards(RolesGuard)
  @Roles('instructor')
  @Put(':lessonId') // 
  async updateLesson(
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @Request() req: RequestWithUser,
  ): Promise<Lesson> {
    return this.lessonService.update(lessonId, updateLessonDto, req.user.userId);
  } 

  @UseGuards(RolesGuard)
  @Roles('instructor')
  @Delete(':lessonId')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeLesson(@Param('lessonId') lessonId: string, @Request() req: RequestWithUser): Promise<void> {
    await this.lessonService.remove(lessonId, req.user.userId);
  }  
}