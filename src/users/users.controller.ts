import { Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import { ParseIntPipe } from '@nestjs/common/pipes';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Customization } from 'src/files/files.configure';
import * as fs from 'fs';
import { ApiBody, ApiConsumes, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Plan } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly productsService: ProductService) {}

  // Получение всех юзеров
  @Get()
  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ description: 'Все пользователи', })
  async findAll() {
    return await this.usersService.findAll();
  }

  // Получение юзера по email
  @Get(':email')
  @ApiOperation({ summary: "Получить пользователя по логину" })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Должен быть email пользователя, который существует в базе данных',
    type: String
  })
  @ApiResponse({ description: 'Пользователь', })
  async findOneByMail(@Param('email') email: string) 
  {
    return await this.usersService.getByEmail(email);
  }

  // Обновление аватара пользователя
  @UseGuards(JwtAuthenticationGuard)
  @Patch('avatar')
  @ApiOperation({ summary: "Изменить фотографию профиля пользователя" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Картинка', })
  @ApiResponse({ description: "Пользователь" })
  @UseInterceptors(
    FileInterceptor('picture', { storage: diskStorage({
      destination: Customization.destinationPath,
      filename: Customization.customFileName,
    })}))
  async setAvatar(@UploadedFile() file: Express.Multer.File, @Req() request: RequestWithUser) {
    const user = request.user;
    if (file == undefined)
    {
      throw new HttpException("Bad picture", HttpStatus.BAD_REQUEST)
    }
    if (user.avatar != "./images/unused-profile-preview.jpg") {
      await fs.unlink(user.avatar, (err) => {
        if (err) {
         throw new HttpException("Problems with your picture", HttpStatus.BAD_REQUEST);
        }});
    }
    return this.usersService.updateAvatar({
      avatar: file.destination + file.filename,
    }, user);
  }

  // Получение записей, на которые записан юзер
  @UseGuards(JwtAuthenticationGuard)
  @Get('my-records/:id')
  @ApiOperation({ summary: "Получить записи пользователя" })
  @ApiResponse({ 
    description: 'Список записей пользователя',
    type: Array<Plan>
  })
  async getMyPlans(@Req() request: RequestWithUser) {
    const user = request.user;
    console.log(user);
    return await this.usersService.getMyPlans(user);
  }

  // Обновление информации в профиле
  @UseGuards(JwtAuthenticationGuard)
  @Patch('update')
  @ApiOperation({ summary: "Изменить данные пользователя" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ description: 'Измененный пользователь (без пароля)', })
  async updateProfile(@Body() updateData: UpdateUserDto, @Req() request: RequestWithUser){
    const user = request.user;  
    user.password = undefined;
    return this.usersService.updateProfile(updateData, user);
  }

  // Получение продуктов юзера
  @Get('products/:id')
  @ApiOperation({ summary: "Получить услуги, созданные пользователем" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID пользователя, который существует в базе данных',
    type: Number
  })
  @ApiResponse({ description: 'Услуги, созданные пользователем', })
  async getUserProducts(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getProductsByUserId(id)
  }

  // Получение юзера по id
  @Get(':id')
  @ApiOperation({ summary: "Получить пользователя по ID" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID пользователя, который существует в базе данных',
    type: Number
  })
  @ApiResponse({ description: 'Пользователь', })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(Number(id));
  }
}
