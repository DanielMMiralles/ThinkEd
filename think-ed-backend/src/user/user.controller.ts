// src/user/user.controller.ts
import { Controller, Get, UseGuards, Request, Patch, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserDto } from './dto/public-profile.dto';
import { Roles } from 'src/auth/roles.decorator';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() req: RequestWithUser): Promise<User> {
    return this.userService.findOneById(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me') 
  @Roles('estudiante', 'instructor')
  async updateMe(@Body() updateUserDto: UpdateUserDto, @Request() req: RequestWithUser): Promise<User> {
    return this.userService.update(req.user.userId, updateUserDto);
  }

  @Get(':userId') 
  async getPublicProfile(@Param('userId') userId: string): Promise<PublicUserDto> {
    return this.userService.findPublicProfile(userId);
  }
}
