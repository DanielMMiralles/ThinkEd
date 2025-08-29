// src/enrollment/enrollment.controller.ts
import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDto } from './dto/enrollment.dto';
import { CourseResponseDto } from '../course/dto/course-response.dto';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard('jwt')) // Protege la ruta con el guard de JWT
  @Post()
  async enrollCourse(@Body() enrollmentDto: EnrollmentDto, @Request() req: RequestWithUser) {
    return this.enrollmentService.createEnrollment(enrollmentDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-courses') 
  async getMyCourses(@Request() req: RequestWithUser): Promise<CourseResponseDto[]> {
    return this.enrollmentService.findEnrolledCourses(req.user.userId);
  }
}