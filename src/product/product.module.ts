import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [PrismaModule],
    providers: [ProductService, UsersService],
    controllers: [ProductController],
    exports: [ProductService],})
export class ProductModule {}
