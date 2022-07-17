import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest()
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      return JSON.parse(base64);
    }
    const user = parseJwt(request);
    const userRole = user.role;

    return requiredRoles.some((role) => userRole?.includes(role));
  }
}
