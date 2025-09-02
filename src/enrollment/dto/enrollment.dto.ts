// src/enrollment/dto/enrollment.dto.ts
import { IsUUID } from 'class-validator';

export class EnrollmentDto {
  @IsUUID()
  courseId: string;
}