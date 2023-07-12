import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty({
    description: 'Логин пользователя, его электронная почта',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'examplepassword',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export default RegisterDto;
