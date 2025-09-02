// src/course/dto/update-course.dto.ts
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}