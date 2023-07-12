import { Role } from '@prisma/client';
import { CanActivate, Type } from '@nestjs/common';
declare const RoleGuard: (role: Role) => Type<CanActivate>;
export default RoleGuard;
