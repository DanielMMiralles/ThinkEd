// src/user/user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protege la ruta con el guard de JWT
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}