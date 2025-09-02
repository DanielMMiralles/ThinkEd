// src/user/dto/public-user.dto.ts
import { Expose } from 'class-transformer';
import { Course } from '../../course/course.entity';

export class PublicUserDto {
  @Expose()
  id: string;

  @Expose()
  full_name: string;

  @Expose()
  role: string;

  @Expose()
  courses?: Course[]; // Opcional, solo si el usuario es un instructor
}