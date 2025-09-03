// src/submission/submission.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submission.entity';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';
import { Question } from '../quiz/question.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async submitQuiz(userId: string, createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const { quizId, studentAnswers } = createSubmissionDto;

    // 1. Obtener el cuestionario y sus preguntas
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: ['questions'],
    });

    if (!quiz) {
      throw new NotFoundException(`Cuestionario con ID "${quizId}" no encontrado.`);
    }

    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      select: ['id', 'full_name', 'email', 'role']
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID "${userId}" no encontrado.`);
    }

    // 2. Calificar las respuestas del estudiante
    let correctAnswersCount = 0;
    const totalQuestions = quiz.questions.length;

    if (totalQuestions === 0) {
      throw new NotFoundException('El cuestionario no tiene preguntas.');
    }

    for (const studentAnswer of studentAnswers) {
      const question = quiz.questions.find(q => q.id === studentAnswer.questionId);
      
      // Asegurar que la pregunta exista y que la respuesta del estudiante sea la correcta
      if (question && question.correct_answer === studentAnswer.selectedAnswer) {
        correctAnswersCount++;
      }
    }

    // 3. Calcular el puntaje (ejemplo: de 0 a 100)
    const score = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

    // 4. Guardar la entrega del estudiante
    const submission = this.submissionRepository.create({
      quiz: quiz,
      student: user,
      score: score,
    });

    return this.submissionRepository.save(submission);
  }
}