// src/course/course.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { User } from '../user/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';

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
}
