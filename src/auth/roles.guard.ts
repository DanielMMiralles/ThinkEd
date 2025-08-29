// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; //Permite leer los metadatos definidos en los decoradores

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()); // Obtiene los roles requeridos del decorador @Roles

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest(); // Obtiene el objeto de la solicitud HTTP
    const user = request.user; // Obtiene el usuario del objeto de la solicitud

    if (!user || !user.role) {
      return false;
    }

    // Comprueba si el rol del usuario está incluido en los roles requeridos
    return requiredRoles.includes(user.role);
  }
}