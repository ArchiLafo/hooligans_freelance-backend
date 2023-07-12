import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

  export class UpdateProductDto {

    @ApiProperty({
      description: 'Измененное описание продукта',
      example: 'Измененная, но все еще лучшая услуга, которой вы только можете воспользоваться.',
    })
    @IsString()
    description: string

    @ApiProperty({
      description: 'Измененная стоимость услуги',
      example: '300',
    })
    @IsString()
    cost: string

    @ApiProperty({
      description: 'Измененное название услуги',
      example: 'Теперь уж точно лучшая услуга',
    })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
      description: 'Измененное место проведения услуги',
      example: 'ул. Академика Зелинского, д. 6',
    })
    @IsNotEmpty()
    @IsString()
    places: string    

    @ApiProperty({
      description: 'Измененная категория услуги',
      example: 'Автомобили',
    })
    @IsNotEmpty()
    @IsString()
    category: string

    @ApiProperty({
      description: 'Измененная длительность проведения услуги',
      example: '2 часа',
    })
    @IsNotEmpty()
    @IsString()
    duration: string
  }
  
  export default UpdateProductDto;