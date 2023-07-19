import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './tokenPayload.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
 
  // Регистрация юзера
  public async register(registrationData: RegisterDto) 
  {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try
    {
      const isCompany = registrationData.isCompany;
      delete registrationData.isCompany
      const createdUser = await this.usersService.create(
        {
          ...registrationData,
          password: hashedPassword,
        }, isCompany);
      createdUser.password = undefined;
      return createdUser;
    } 
    catch (error) 
    {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('Пользователь с таким адресом электронной почты уже существует', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  // Авторизация пользователя
  public async getAuthenticatedUser(email: string, plainTextPassword: string) 
  {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user
    } catch (error) {
      throw new HttpException('Неверные учетные данные', HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  // Верификация пароля
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) 
  {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }
  }

  // Получение куку
  public async getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  // Логаут пользователя
  public async getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async aboutUser(user: User) {
    user.password = undefined; 
    if (user.idCompany)
    {
      user["company"] = await this.prismaService.company.findUnique(
        {
          where:
          {
            id: user.idCompany
          }
        }
      )
    }
    else
      user["company"] = null
    return user;
  }
}