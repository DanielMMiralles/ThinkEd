// src/calendar/calendar.module.ts
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Enrollment])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}