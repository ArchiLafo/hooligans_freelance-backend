import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
  
  export class UpdatePlanDto {
    @ApiProperty({
        description: 'Измененный год записи на проведение услуги',
        example: '2023',
      })
      @IsNotEmpty()
      year: string
  
      @ApiProperty({
        description: 'Измененный месяц записи на проведение услуги',
        example: '12',
      })
      @IsNotEmpty()
      month: string
      
      @ApiProperty({
        description: 'Измененный день записи на проведение услуги',
        example: '31',
      })
      @IsNotEmpty()
      day: string
      
      @ApiProperty({
        description: 'Измененный час записи на проведение услуги',
        example: '12',
      })
      @IsNotEmpty()
      hours: string
      
      @ApiProperty({
        description: 'Измененные минуты записи на проведение услуги',
        example: '30',
      })
      @IsNotEmpty()
      minutes: string
}