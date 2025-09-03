// src/user/user.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Course } from '../course/course.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserDto } from './dto/public-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'full_name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      select: ['id', 'full_name', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    // Verificar si el correo ya existe en otro usuario
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({ 
        where: { email: updateUserDto.email },
        select: ['id', 'email']
      });
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está en uso.');
      }
    }

    // El Object.assign es la forma más limpia de actualizar
    const updatedUser = Object.assign(user, updateUserDto);

    return this.userRepository.save(updatedUser);
  }

  async findPublicProfile(id: string): Promise<PublicUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'full_name', 'role'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }

    const publicProfile: PublicUserDto = {
      id: user.id,
      full_name: user.full_name,
      role: user.role,
    };

    // Si es un instructor, también obtén sus cursos
    if (user.role === 'instructor') {
      const courses = await this.courseRepository.find({
        where: { instructor: { id: user.id } },
        relations: ['instructor'],
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          status: true,
          instructor: {
            id: true,
            full_name: true
          }
        }
      });
      publicProfile.courses = courses;
    }

    return publicProfile;
  }
}