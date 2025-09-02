// src/lesson/lesson.service.ts
import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Module as ModuleEntity } from '../module/module.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  private async validateInstructorPermission(lessonId: string, userId: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['module', 'module.course', 'module.course.instructor'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lección con ID "${lessonId}" no encontrada.`);
    }

    if (!lesson.module?.course?.instructor?.id || lesson.module.course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para modificar esta lección.');
    }

    return lesson;
  }

  async create(moduleId: string, createLessonDto: CreateLessonDto, userId: string): Promise<Lesson> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
      relations: ['course', 'course.instructor'],
    });

    if (!module) {
      throw new NotFoundException(`Módulo con ID "${moduleId}" no encontrado.`);
    }

    if (!module.course?.instructor?.id || module.course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para agregar lecciones a este módulo.');
    }

    const newLesson = this.lessonRepository.create({
      ...createLessonDto,
      module,
    });
    return this.lessonRepository.save(newLesson);
  }

  async findAll(moduleId: string): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { module: { id: moduleId } },
      order: { order: 'ASC' },
    });
  }

  async findOne(lessonId: string, userId: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['module', 'module.course'],
      select: {
        id: true,
        title: true,
        description: true,
        videoUrl: true,
        order: true,
        module: {
          id: true,
          course: {
            id: true,
            title: true
          }
        }
      }
    });

    if (!lesson) {
      throw new NotFoundException(`Lección con ID "${lessonId}" no encontrada.`);
    }

    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: lesson.module.course.id },
      },
      select: ['id']
    });

    if (!enrollment) {
      throw new ForbiddenException('No estás inscrito en el curso al que pertenece esta lección.');
    }

    return lesson;
  }

  async update(lessonId: string, updateLessonDto: UpdateLessonDto, userId: string): Promise<Lesson> {
    const lesson = await this.validateInstructorPermission(lessonId, userId);
    const updatedLesson = Object.assign(lesson, updateLessonDto);
    return this.lessonRepository.save(updatedLesson);
  }

  async remove(lessonId: string, userId: string): Promise<void> {
    const lesson = await this.validateInstructorPermission(lessonId, userId);
    await this.lessonRepository.remove(lesson);
  }
}