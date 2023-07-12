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
      description: 'Запись на проведение услуги',
      example: '2023-07-10T15:30:00+07:00',
    })
    @IsNotEmpty()
    //@IsDate()
    dayTime: Date
  }
  
  export default CreatePlanDto;