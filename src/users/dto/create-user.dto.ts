import { Role } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty({
    description: 'Электронная почта пользователя',
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

  // @ApiProperty({
  //   description: 'Привелегии пользователя (по умолчанию User)',
  //   example: 'User',
  // })
  // @IsNotEmpty()
  // @IsEnum(Role)
  // role: Role;
}

export default CreateUserDto;
