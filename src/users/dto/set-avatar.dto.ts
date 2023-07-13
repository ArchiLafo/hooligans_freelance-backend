import { IsNotEmpty, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetAvatarDto {
    @ApiProperty({
        description: 'Фотография профиля пользователя',
        example: './images/unused-profile-preview.jpg',
      })
    @IsNotEmpty()
    avatar: string
}

export default SetAvatarDto;
