import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from '../guard/localAuthentication.guard';
import JwtAuthenticationGuard from '../guard/jwt-authentication.guard';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { use } from 'passport';

@ApiCookieAuth()
@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
 
  // Регистрация
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    description: 'Данные созданного пользователя',
  })
  async register(@Body() registrationData: RegisterDto) 
  {
    //console.log(registrationData)
    return this.authenticationService.register(registrationData);
  } 

  // Логин
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    description: 'Данные пользователя, без пароля'
  })
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    console.log("Логин реквест: " + request.user.email)
    const { user } = request
    const cookie = await this.authenticationService.getCookieWithJwtToken(user.id)
    console.log("Насрал куки в ваши руки: " + cookie)
    request.res.set('Set-Cookie', cookie)
    user.password = undefined
    return request.res.send(user) 
  }

  // Выход из профиля
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Выход из профиля пользователя' })
  @ApiResponse({
   status: 200,
    description: 'Пользователь вышел из аккаунта'
    })
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    console.log("Пользователь " + request.user.email + " вышел")
    response.setHeader('Set-Cookie', await this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  // Получение информации о пользователе
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({
   description: 'Данные пользователя, без пароля'
  })
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user; 
    return await this.authenticationService.aboutUser(user);
  }
}