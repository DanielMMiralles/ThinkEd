// src/types/course.ts
import type { Module } from './module';

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  instructorName: string;
  instructorId: string;
  modules : Module[];
};