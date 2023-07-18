import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [CompanyModule, PrismaModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
