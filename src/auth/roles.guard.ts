import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    console.log('process.env.ACCESS_ROLE', process.env.ACCESS_ROLE);

    if (headers['access_permission'] === process.env.ACCESS_ROLE) {
      return true;
    } else {
      return false;
    }
  }
}
