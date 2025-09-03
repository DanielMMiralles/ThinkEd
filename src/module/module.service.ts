// src/module/module.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from './module.entity';
import { Course } from '../course/course.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(courseId: string, createModuleDto: CreateModuleDto, userId: string): Promise<Module> {
    //Verificar si el curso existe y obtener el instructor
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructor'],
      select: {
        id: true,
        title: true,
        instructor: {
          id: true,
          full_name: true
        }
      }
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID "${courseId}" no encontrado.`);
    }

    //Verificar si el usuario que crea el módulo es el instructor del curso
    if (!course.instructor?.id || course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para agregar módulos a este curso.');
    }

    //Crear el nuevo módulo y guardarlo
    const newModule = this.moduleRepository.create({
      ...createModuleDto,
      course,
    });

    return this.moduleRepository.save(newModule);
  }

  async findAll(courseId: string): Promise<Module[]> {
    return this.moduleRepository.find({
      where: { course: { id: courseId } },
      order: { order: 'ASC' },
      select: ['id', 'title', 'description', 'order']
    });
  }

  async update(moduleId: string, updateModuleDto: UpdateModuleDto, userId: string): Promise<Module> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
      relations: ['course', 'course.instructor'],
      select: {
        id: true,
        title: true,
        description: true,
        order: true,
        course: {
          id: true,
          instructor: {
            id: true
          }
        }
      }
    });

    if (!module) {
      throw new NotFoundException(`Módulo con ID "${moduleId}" no encontrado.`);
    }
    if (!module.course?.instructor?.id || module.course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para actualizar este módulo.');
    }


    const updatedModule = Object.assign(module, updateModuleDto);
    return this.moduleRepository.save(updatedModule);
  }

  async remove(moduleId: string, userId: string): Promise<void> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
      relations: ['course', 'course.instructor'],
      select: {
        id: true,
        course: {
          id: true,
          instructor: {
            id: true
          }
        }
      }
    });

    if (!module) {
      throw new NotFoundException(`Módulo con ID "${moduleId}" no encontrado.`);
    }
    if (!module.course?.instructor?.id || module.course.instructor.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para eliminar este módulo.');
    }

    await this.moduleRepository.remove(module);
  }
}