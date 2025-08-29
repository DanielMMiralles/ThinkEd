
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Course } from 'src/course/course.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'estudiante' })
  role: string;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}