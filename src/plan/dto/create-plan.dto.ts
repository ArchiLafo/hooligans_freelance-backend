import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
  
  export class CreatePlanDto {
    @ApiProperty({
      description: 'ID продукта, который содержится в базе данных',
      example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    idProduct: number

    @ApiProperty({
      description: 'Год записи на проведение услуги',
      example: '2023',
    })
    @IsNotEmpty()
    year: string

    @ApiProperty({
      description: 'Месяц записи на проведение услуги',
      example: '12',
    })
    @IsNotEmpty()
    month: string
    
    @ApiProperty({
      description: 'День записи на проведение услуги',
      example: '31',
    })
    @IsNotEmpty()
    day: string
    
    @ApiProperty({
      description: 'Час записи на проведение услуги',
      example: '12',
    })
    @IsNotEmpty()
    hours: string
    
    @ApiProperty({
      description: 'Минуты записи на проведение услуги',
      example: '30',
    })
    @IsNotEmpty()
    minutes: string
  }
  
  export default CreatePlanDto;