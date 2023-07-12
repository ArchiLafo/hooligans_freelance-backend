import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [PrismaModule],
  providers: [PlanService, UsersService, ProductService],
  controllers: [PlanController],
  exports: [PlanService],

})
export class PlanModule {}
