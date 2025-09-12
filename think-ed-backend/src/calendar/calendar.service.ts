// src/calendar/calendar.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Enrollment) // <-- Inyecta el repositorio de inscripciones
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async createEvent(createEventDto: CreateEventDto, instructorId: string): Promise<Event> {
    const event = this.eventRepository.create({
      ...createEventDto,
      instructor: { id: instructorId },
      course: { id: createEventDto.courseId },
    });
    return this.eventRepository.save(event);
  }

  async findEvents(userId: string, userRole: string): Promise<Event[]> {
    if (userRole === 'instructor') {
      // Si el usuario es un instructor, devuelve sus propios eventos.
      return this.eventRepository.find({
        where: { instructor: { id: userId } },
        relations: ['course', 'instructor'],
      });
    } else if (userRole === 'estudiante') {
      // Si es un estudiante, busca los eventos de los cursos en los que está inscrito.
      const enrollments = await this.enrollmentRepository.find({
        where: { user: { id: userId } },
        relations: ['course'],
      });

      if (enrollments.length === 0) {
        return [];
      }

      // Obtiene los IDs de los cursos inscritos
      const courseIds = enrollments.map(enrollment => enrollment.course.id);
      
      return this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.course', 'course')
        .leftJoinAndSelect('event.instructor', 'instructor')
        .where('event.course.id IN (:...courseIds)', { courseIds }) // <-- Busca eventos que coincidan con los IDs de los cursos
        .getMany();
    }
    
    return []; // Devuelve un array vacío si el rol no es válido.
  }

  async updateEvent(eventId: string, updateEventDto: UpdateEventDto, userId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['instructor'], // <-- Cargar la relación del instructor
    });

    if (!event) {
      throw new NotFoundException(`El evento con ID ${eventId} no fue encontrado.`);
    }

    // Verifica si el usuario que intenta actualizar es el mismo que creó el evento
    if (event.instructor.id !== userId) {
      throw new UnauthorizedException('Solo el instructor que creó este evento puede actualizarlo.');
    }
    
    // Actualiza el evento
    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['instructor'],
    });

    if (!event) {
      throw new NotFoundException(`El evento con ID ${eventId} no fue encontrado.`);
    }

    // Verifica si el usuario que intenta eliminar es el mismo que creó el evento
    if (event.instructor.id !== userId) {
      throw new UnauthorizedException('Solo el instructor que creó este evento puede eliminarlo.');
    }

    await this.eventRepository.remove(event);
  }
}