// src/course/course.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Course } from './course.entity';
import { User } from '../user/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto, userId: string): Promise<Course> {
    const instructor = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!instructor) {
      throw new UnauthorizedException('Instructor no encontrado.');
    }

    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      instructor,
    });
    
    return this.courseRepository.save(newCourse);
  }

  async findAll(
    limit: number,
    offset: number,
    category?: string,
    title?: string,
  ): Promise<CourseResponseDto[]> {
    const whereCondition: any = {
      status: 'active',
    };

    if (category) {
      whereCondition.category = category;
    }

    if (title) {
      whereCondition.title = Like(`%${title}%`);
    }

    const courses = await this.courseRepository.find({
      where: whereCondition,
      take: limit,
      skip: offset,
      relations: ['instructor'],
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        instructor: {
          id: true,
          full_name: true,
        },
      },
    });

    return courses.map(course => ({
      ...course,
      instructorName: course.instructor.full_name,
    }));
  }

  async findOne(id: string): Promise<CourseResponseDto> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .select([
        'course.id',
        'course.title',
        'course.description',
        'course.price',
        'course.category',
        'course.status',
        'course.createdAt',
        'course.updatedAt', 
        'instructor.id',
        'instructor.full_name',
      ])
      .where('course.id = :id', { id })
      .getOne();
    
    if (!course) {
      throw new NotFoundException(`Curso con ID "${id}" no encontrado.`);
    }

    return {
      ...course,
      instructorName: course.instructor.full_name,
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructor'],
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID "${id}" no encontrado.`);
    }

    if (course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para actualizar este curso.');
    }

    // Actualiza los campos que se proporcionaron en el DTO
    const updatedCourse = Object.assign(course, updateCourseDto);
    return this.courseRepository.save(updatedCourse);
  }

  async remove(id: string, userId: string): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructor'],
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID "${id}" no encontrado.`);
    }
    
    if (course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para eliminar este curso.');
    }

    await this.courseRepository.remove(course);
  }
}
