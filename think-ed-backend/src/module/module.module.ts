// src/module/module.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleEntity } from './module.entity';
import { Course } from '../course/course.entity';
import { User } from '../user/user.entity';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, Course, User])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}