// src/types/calendar.ts

export type CalendarEvent = {
  id: string; // El ID del evento
  title: string;
  start: Date;
  end: Date;
  courseId: string;
};