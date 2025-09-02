import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*Modules*/ 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { QuizModule } from './quiz/quiz.module';
import { SubmissionModule } from './submission/submission.module';


/*Entities*/
import { User } from './user/user.entity';
import { Course } from './course/course.entity';
import { Lesson } from './lesson/lesson.entity';
import { Module as ModuleEntity } from './module/module.entity';
import { Enrollment } from './enrollment/enrollment.entity';
import { Submission } from './submission/submission.entity';
import { Quiz } from './quiz/quiz.entity';
import { Question } from './quiz/question.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Course, Lesson, ModuleEntity, Enrollment, Submission, Quiz, Question],
        synchronize: true, // En producción, es mejor usar migraciones en lugar de synchronize
      }),
    }),
    UserModule,
    AuthModule,
    CourseModule,
    EnrollmentModule,
    ModuleModule,
    QuizModule,
    SubmissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
