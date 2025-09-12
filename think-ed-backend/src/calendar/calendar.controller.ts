// src/calendar/calendar.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Put, Delete, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('calendar')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @Roles('instructor')
  create(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.calendarService.createEvent(createEventDto, req.user.userId);
  }

  @Get()
  @Roles('estudiante', 'instructor')
  getEvents(@Request() req) {
    // Pasa el ID y el rol del usuario al servicio
    return this.calendarService.findEvents(req.user.userId, req.user.role);
  }

  @Put(':id')
  @Roles('instructor')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Request() req) {
    return this.calendarService.updateEvent(id, updateEventDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('instructor')
  delete(@Param('id') id: string, @Request() req) {
    return this.calendarService.deleteEvent(id, req.user.userId);
  }
}