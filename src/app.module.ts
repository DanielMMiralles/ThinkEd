import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/*Modules*/ 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

/*Entities*/
import { User } from './user/user.entity';
import { Course } from './course/course.entity';
import { Lesson } from './lesson/lesson.entity';
import { Module as ModuleEntity } from './module/module.entity';
import { Enrollment } from './enrollment/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'thinked_user', 
      password: 'Adridan417*', 
      database: 'thinked', 
      entities: [ User, Course, Lesson, ModuleEntity, Enrollment], 
      synchronize: true, 
    }),
    UserModule,
    AuthModule,
    CourseModule,
    EnrollmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
