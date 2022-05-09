import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/const/const';
import { Role } from '../enums/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
