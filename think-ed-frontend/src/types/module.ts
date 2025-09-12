// src/types/module.ts
import type { Lesson } from './lesson';

// Define el tipo para un módulo, que contiene un arreglo de lecciones
export type Module = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};