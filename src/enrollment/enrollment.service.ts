// src/enrollment/enrollment.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentDto } from './dto/enrollment.dto';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { CourseResponseDto } from '../course/dto/course-response.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createEnrollment(enrollmentDto: EnrollmentDto, userId: string) {
    const { courseId } = enrollmentDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({ where: { id: courseId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    if (!course) {
      throw new NotFoundException('Curso no encontrado.');
    }

    // Verificar si el usuario ya está inscrito en el curso
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (existingEnrollment) {
      throw new ConflictException('Ya estás inscrito en este curso.');
    }

    //Crear el nuevo registro de inscripción
    const newEnrollment = this.enrollmentRepository.create({ user, course });

    return this.enrollmentRepository.save(newEnrollment);
  }
  
  async findEnrolledCourses(
    userId: string,
    limit: number,
    offset: number,
    category?: string,
    title?: string,
  ): Promise<CourseResponseDto[]> {
    // Iniciar el Query Builder
    let query = this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .where('enrollment.user.id = :userId', { userId });

    // Aplicar el filtrado
    if (category) {
      query = query.andWhere('course.category = :category', { category });
    }

    if (title) {
      query = query.andWhere('course.title LIKE :title', { title: `%${title}%` });
    }

    // Aplicar paginación y orden
    const enrollments = await query
      .skip(offset) 
      .take(limit) 
      .getMany();

    if (!enrollments || enrollments.length === 0) {
      throw new NotFoundException('No estás inscrito en cursos que coincidan con los criterios.');
    }

    //Mapear y devolver los resultados
    return enrollments.map(enrollment => ({
      ...enrollment.course,
      instructorName: enrollment.course.instructor.full_name,
    }));
  }
}