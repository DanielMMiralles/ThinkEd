// src/course/course.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
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
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req: RequestWithUser,
  ) {
    return this.courseService.create(createCourseDto, req.user.userId);
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 0,
    @Query('category') category?: string,
    @Query('title') title?: string,
  ): Promise<CourseResponseDto[]> {
    return this.courseService.findAll(limit, offset, category, title);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CourseResponseDto> {
    return this.courseService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Put(':id')
  async updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req: RequestWithUser,
  ): Promise<CourseResponseDto> {
    return this.courseService.update(id, updateCourseDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Delete(':id')
  async removeCourse(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
    await this.courseService.remove(id, req.user.userId);
    return { message: 'Curso eliminado exitosamente.' };
  }
}
