import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiConsumes, ApiBody } from '@nestjs/swagger';


@Controller('api/storage')
export class StorageController {
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file')
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    @Get(':file')
    seeUploadedFile(@Param('file') file: string, @Res() res) {
        return res.sendFile(file, { root: './uploads' });
    }

}
