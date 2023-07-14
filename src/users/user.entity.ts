import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, MinLength,IsEnum, } from 'class-validator';
 
class User {

  @ApiProperty({
    description: 'ID пользователя (заполняется само)',
    example: '1',
  })
  public id?: number;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'example@example.com',
  })
  @IsEmail()
  public email: string;
  
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов, или Иван',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'examplepassword, или 12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @ApiProperty({
    description: 'Привелегии пользователя (по умолчанию User)',
    example: 'User',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
 
export default User;