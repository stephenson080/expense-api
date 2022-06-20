import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/user/types';
import {ROLES_KEY} from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // console.log(context.switchToHttp().getRequest())
    const { user } = context.switchToHttp().getRequest();

    

    console.log(user)
    return false
    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}