// src/enrollment/enrollment.controller.ts
import { Controller, Post, Body, Request, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDto } from './dto/enrollment.dto';
import { CourseResponseDto } from '../course/dto/course-response.dto';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { Roles } from 'src/auth/roles.decorator';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard('jwt')) // Protege la ruta con el guard de JWT
  @Roles("estudiante") // Solo los estudiantes pueden inscribirse en cursos
  @Post()
  async enrollCourse(@Body() enrollmentDto: EnrollmentDto, @Request() req: RequestWithUser) {
    return this.enrollmentService.createEnrollment(enrollmentDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-courses')
  async getMyCourses(
    @Request() req: RequestWithUser,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('category') category?: string,
    @Query('title') title?: string,
  ): Promise<CourseResponseDto[]> {
    return this.enrollmentService.findEnrolledCourses(
      req.user.userId,
      parseInt(limit as any, 10),
      parseInt(offset as any, 10),
      category,
      title,
    );
  }
}