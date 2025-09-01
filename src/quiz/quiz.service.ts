// src/quiz/quiz.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Lesson } from '../lesson/lesson.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private dataSource: DataSource,
  ) {}

  // ... (existing createQuiz and findOne methods)

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { lessonId, questions, ...quizData } = createQuizDto;
      const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });

      if (!lesson) {
        throw new NotFoundException(`Lección con ID "${lessonId}" no encontrada.`);
      }

      const newQuiz = this.quizRepository.create({
        ...quizData,
        lesson: lesson,
      });

      await queryRunner.manager.save(newQuiz);

      for (const questionDto of questions) {
        const newQuestion = this.questionRepository.create({
          quiz: newQuiz,
          question_text: questionDto.question_text,
          options: questionDto.options,
          correct_answer: questionDto.correct_answer,
        });
        await queryRunner.manager.save(newQuestion);
      }

      await queryRunner.commitTransaction();
      return newQuiz;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!quiz) {
      throw new NotFoundException(`Cuestionario con ID "${id}" no encontrado.`);
    }

    return quiz;
  }

  async findQuizzesByLessonId(lessonId: string): Promise<Quiz[]> {
    const quizzes = await this.quizRepository.find({
      where: { lesson: { id: lessonId } },
      relations: ['questions'],
    });

    if (!quizzes || quizzes.length === 0) {
      throw new NotFoundException(`No se encontraron cuestionarios para la lección con ID "${lessonId}".`);
    }

    return quizzes;
  }
}