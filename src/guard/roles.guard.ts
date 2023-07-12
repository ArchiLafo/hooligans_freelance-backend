import { Role } from '@prisma/client';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
 

// поскольку декораторы работают снизу вверх, нам нужно использовать JwtAuthenticationGuard под RoleGuard
// чтобы решить эту проблему, мы можем расширить JwtAuthenticationGuard

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      // нам больше не нужно использовать их вместе вместе
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.role.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;