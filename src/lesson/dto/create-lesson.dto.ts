// src/lesson/dto/create-lesson.dto.ts
import { IsString, IsNotEmpty, IsUrl, IsOptional, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @IsNumber()
  @IsOptional()
  order?: number; 
}