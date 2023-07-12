import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateProductDto {
    
    @ApiProperty({
      description: 'Описание продукта',
      example: 'Лучшая услуга, которой вы только можете воспользоваться.',
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
      description: 'Стоимость услуги',
      example: '100',
    })
    @IsString()
    cost: string

    @ApiProperty({
      description: 'Название услуги',
      example: 'Лучшая услуга',
    })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
      description: 'Место проведения услуги',
      example: 'ул. Киренского, д. 26',
    })
    @IsNotEmpty()
    @IsString()
    places: string    

    @ApiProperty({
      description: 'Категория услуги',
      example: 'Искусство',
    })
    @IsString()
    category: string

    @ApiProperty({
      description: 'Длительность проведения услуги',
      example: '15 минут',
    })
    @IsNotEmpty()
    @IsString()
    duration: string

  }
  
  export default CreateProductDto;