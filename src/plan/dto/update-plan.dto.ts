import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
  
  export class UpdatePlanDto {
    @ApiProperty({
      description: 'Год записи на проведение услуги',
      example: '2023',
    })
    @IsNotEmpty()
    datetime: string
}