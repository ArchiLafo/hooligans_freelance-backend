import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { ProductModule } from 'src/product/product.module';
import { PlanModule } from 'src/plan/plan.module';
import { PlanService } from 'src/plan/plan.service';

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [UsersService, PlanService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
