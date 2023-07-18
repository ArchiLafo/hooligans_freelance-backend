import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'example@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
} 

export default CreateEmployeeDto;
