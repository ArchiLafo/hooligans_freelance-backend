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
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
<<<<<<< HEAD
import { MailModule } from './mail/mail.module';
=======
import { DataHashModule } from './data_hash/data_hash.module';
>>>>>>> 2b4712f17f03728f28460814092014534efc5366

@Module({
imports: [
    PrismaModule,
    UsersModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    ProductModule,
    ModerationModule,
    PlanModule,
    CompanyModule,
    CategoryModule,
<<<<<<< HEAD
    MailModule,
=======
    DataHashModule,
>>>>>>> 2b4712f17f03728f28460814092014534efc5366
  ],
  controllers: [AppController, ProductController, ModerationController, FilesController],
  providers: [AppService, ModerationService, FilesService],
})
export class AppModule {}
