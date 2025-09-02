// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // Define el decorador @Roles que asigna los roles requeridos a los metadatos`