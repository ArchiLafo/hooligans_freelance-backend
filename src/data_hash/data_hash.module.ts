import { Module } from '@nestjs/common';
import { DataHashService } from './data_hash.service';
import { DataHashController } from './data_hash.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
    providers: [DataHashService, PrismaService],
    controllers: [DataHashController],
    exports: [DataHashService],
})
export class DataHashModule {}
