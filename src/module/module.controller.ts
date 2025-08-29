// src/module/module.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Get, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './module.entity';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('courses/:courseId/modules')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('instructor')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async createModule(
    @Param('courseId') courseId: string,
    @Body() createModuleDto: CreateModuleDto,
    @Request() req: RequestWithUser,
  ): Promise<Module> {
    return this.moduleService.create(courseId, createModuleDto, req.user.userId);
  }

  @Get() 
  async findCourseModules(@Param('courseId') courseId: string): Promise<Module[]> {
    return this.moduleService.findAll(courseId);
  }

  @Put(':moduleId') 
  async updateModule(
    @Param('moduleId') moduleId: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @Request() req: RequestWithUser,
  ): Promise<Module> {
    return this.moduleService.update(moduleId, updateModuleDto, req.user.userId);
  }

  @Delete(':moduleId')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeModule(@Param('moduleId') moduleId: string, @Request() req: RequestWithUser): Promise<void> {
    await this.moduleService.remove(moduleId, req.user.userId);
  }
}