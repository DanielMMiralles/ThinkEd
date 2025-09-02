// src/course/dto/course-response.dto.ts
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CourseResponseDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    category: string;

    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    instructorName?: string;

}