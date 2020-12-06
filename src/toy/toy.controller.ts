import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { CreateToyDTO } from 'src/dto/create-toy.dto';
import { UpdateToyDTO } from 'src/dto/update-toy.dto';
import { ToyService } from './toy.service';
import { diskStorage } from 'multer';
import path = require('path');
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('toy')
export class ToyController {
    constructor(private readonly toyService: ToyService) {}

    @Get()
    public async getAll() {
        return await this.toyService.getAll();
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("img",{
            storage: diskStorage({
                destination: './uploads/juguetes',
                filename: (req, file, cb) => {
                    const filename = path.parse(file.originalname).name + uuidv4();
                    const ext = path.parse(file.originalname).ext;
                    cb(null, `${filename}${ext}`)
                }
            })
        })
    )
    public async createOne(@UploadedFile() img, @Body() createToyRequest: CreateToyDTO) {
        const resp = await this.toyService.createOne(createToyRequest, img?.path);
        return resp;
    }

    @Put()
    @UseInterceptors(
        FileInterceptor("img",{
            storage: diskStorage({
                destination: './uploads/juguetes',
                filename: (req, file, cb) => {
                    const filename = path.parse(file.originalname).name + uuidv4();
                    const ext = path.parse(file.originalname).ext;
                    cb(null, `${filename}${ext}`)
                }
            })
        })
    )
    public async updateOne(@Query() querys, @UploadedFile() img, @Body() updateToyRequest: UpdateToyDTO) {
        const resp = await this.toyService.updateOne(querys.id, updateToyRequest, img?.path);
        console.log(querys)
        return resp;
    }

    @Delete()
    public async deleteOne(@Query() querys,) {
        const resp = await this.toyService.deleteOne(querys.id)
        return resp;
    }

    @Get('uploads/juguetes/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res) {
        return res.sendFile(join(process.cwd(), "uploads/juguetes/"+imagename))
    }
}
