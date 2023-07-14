import { Get, Post, Param, Res, Controller,  UploadedFile, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Customization } from './files.configure';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import SetAvatarDto from 'src/users/dto/set-avatar.dto';

@ApiTags('Images')
@Controller('images')
export class FilesController {
    // можно типо картинку по названию получить, это для отладки, не трогать
    @Get(':imagename')
    @ApiOperation({ summary: "Получить картинку по названию" })
    @ApiParam({
      name: 'imagename',
      required: true,
      description: 'Должно быть название картинки, которая существует в репозитории',
      type: String
    })
    @ApiResponse({ 
        description: 'Картинка', 
    })
    getImage(@Param('imagename') image, @Res() res) {
        const response = res.sendFile(image, { root: './images' });
        return {
            data: response,
        };
    }

    @Post('upload')
    @ApiOperation({ summary: "Получить картинку по названию" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ description: 'Картинка', })
    @ApiResponse({
        description: "Путь к картинке",
        type: SetAvatarDto,
    })
    @UseInterceptors(
        FileInterceptor('picture', {
        storage: diskStorage({
            destination: Customization.destinationPath,
            filename: Customization.customFileName,
        }),
        }),
    )
    uploadfile(@UploadedFile() file): Express.Multer.File {
        return file.destination + file.filename;    
    }

    // если много фоток грузить будем
    // в принципе, просто можешь их местами поменять в случае надобности

    // @Post('many-upload')
    // @UseInterceptors(
    // FilesInterceptor('picture', 10, {
    //     storage: diskStorage({
    //         destination: Helper.destinationPath,
    //         filename: Helper.customFileName,
    //     }),
    // }),
    // )
    // uploadfiles(@UploadedFiles() files): string {
    //     return 'Successful loaded many pictures';
    // }
}
