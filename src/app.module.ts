import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UsersModule } from './users/users.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ModerationService } from './moderation/moderation.service';
import { ModerationController } from './moderation/moderation.controller';
import { ModerationModule } from './moderation/moderation.module';
import { FilesService } from './files/files.service';
import { FilesController } from './files/files.controller';
import { PlanModule } from './plan/plan.module';

@Module({
imports: [
    PrismaModule,
    UsersModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    ProductModule,
    ModerationModule,
    PlanModule,
  ],
  controllers: [AppController, ProductController, ModerationController, FilesController],
  providers: [AppService, ModerationService, FilesService],
})
export class AppModule {}
