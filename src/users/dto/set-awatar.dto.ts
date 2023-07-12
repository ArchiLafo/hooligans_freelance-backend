import { IsNotEmpty, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetAwatarDto {
    @ApiProperty({
        description: 'Фотография профиля пользователя',
        example: './images/unused-profile-preview.jpg',
      })
    @IsNotEmpty()
    awatar: string
}

export default SetAwatarDto;
