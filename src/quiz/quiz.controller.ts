// src/quiz/quiz.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './quiz.entity';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('quizzes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // 1. Endpoint para que los instructores creen un cuestionario
  @Post()
  @Roles('instructor')
  @HttpCode(HttpStatus.CREATED)
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.createQuiz(createQuizDto);
  }

  // 2. Endpoint para que los estudiantes y los instructores vean un cuestionario
  @Get(':id')
  @Roles('student', 'instructor')
  async getQuizById(@Param('id', ParseUUIDPipe) id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  // 3. Endpoint para que el estudiante acceda a un cuestionario por lección
  @Get('lesson/:lessonId')
  @Roles('student', 'instructor')
  async getQuizzesByLessonId(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<Quiz[]> {
    return this.quizService.findQuizzesByLessonId(lessonId);
  }
}