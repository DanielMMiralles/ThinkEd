// src/submission/submission.controller.ts
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './submission.entity';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('submissions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles("estudiante") // Solo los estudiantes pueden enviar respuestas
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async submitQuiz(@Request() req: RequestWithUser, @Body() createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
        const userId = req.user.userId;
        return this.submissionService.submitQuiz(userId, createSubmissionDto);
    }
}