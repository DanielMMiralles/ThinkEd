// src/submission/dto/create-submission.dto.ts
import { IsUUID, IsArray, IsString, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StudentAnswerDto {
  @IsUUID()
  questionId: string;

  @IsString()
  selectedAnswer: string;
}

export class CreateSubmissionDto {
  @IsUUID()
  quizId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StudentAnswerDto)
  studentAnswers: StudentAnswerDto[];
}