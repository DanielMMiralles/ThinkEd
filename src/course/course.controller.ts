// src/course/course.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor') // Solo los usuarios con el rol 'instructor' pueden acceder a esta ruta
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Request() req: RequestWithUser) {
    return this.courseService.create(createCourseDto, req.user.userId);
  }
}
