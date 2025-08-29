// src/course/course.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { CourseResponseDto } from './dto/course-response.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor') // Solo los usuarios con el rol 'instructor' pueden acceder a esta ruta
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Request() req: RequestWithUser) {
    return this.courseService.create(createCourseDto, req.user.userId);
  }

  @Get()
  async findAll(): Promise<CourseResponseDto[]> {
    return this.courseService.findAll();
  }

  @Get(':id') 
  async findOne(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.courseService.findOne(id);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req: RequestWithUser,
    ) {
    return this.courseService.update(id, updateCourseDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Delete(':id') 
  async removeCourse(@Param('id') id: string, @Request() req: RequestWithUser) {
    await this.courseService.remove(id, req.user.userId);
    return { message: 'Curso eliminado exitosamente.' };
  }
}
