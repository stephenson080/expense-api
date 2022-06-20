import { SetMetadata } from '@nestjs/common';
import { Roles } from '../user/types';

export const ROLES_KEY = 'roles';
export const CustomRoles = (roles: Roles) => SetMetadata(ROLES_KEY, roles);