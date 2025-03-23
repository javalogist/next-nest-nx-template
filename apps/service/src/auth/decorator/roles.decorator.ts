import { Role } from '../../user/schemas/user.schema';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles:Role[]) => SetMetadata(ROLES_KEY,roles);
