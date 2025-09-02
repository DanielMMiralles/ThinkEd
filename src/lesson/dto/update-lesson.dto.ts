// src/lesson/dto/update-lesson.dto.ts
import { IsString, IsOptional, IsUrl, IsNumber } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl?: string;
  
  @IsOptional()
  @IsNumber()
  order?: number; 
}