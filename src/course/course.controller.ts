// src/course/course.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Request() req: RequestWithUser) {
    return this.courseService.create(createCourseDto, req.user.userId);
  }
}
