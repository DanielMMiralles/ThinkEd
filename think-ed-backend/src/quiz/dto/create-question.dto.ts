// src/quiz/dto/create-question.dto.ts
import { IsString, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question_text: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correct_answer: string;
}