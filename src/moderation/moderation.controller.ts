import { Controller, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Moderation')
@Controller('moderation')
export class ModerationController {
    constructor(private readonly moderationService: ModerationService) {}

    @Patch('publish/:id')
    @ApiOperation({ summary: "Опубликовать услугу" })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Должен быть ID услуги, которая существует в базе данных',
      type: Number
    })
    @ApiResponse({ description: 'Услуга опубликована', })
    async publish(@Param('id', ParseIntPipe) id: number) {   
        return await this.moderationService.publish(id)
    }
}
