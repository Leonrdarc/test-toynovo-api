import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateToyDTO } from 'src/dto/create-toy.dto';
import { UpdateToyDTO } from 'src/dto/update-toy.dto';
import { ToyService } from './toy.service';

@Controller('toy')
export class ToyController {
    constructor(private readonly toyService: ToyService) {}

    @Get()
    public async getAll() {
        return await this.toyService.getAll();
    }

    @Post()
    public async createOne(@Body() createToyRequest: CreateToyDTO) {
        const resp = await this.toyService.createOne(createToyRequest);
        return resp;
    }

    @Put()
    public async updateOne(@Param("id") toyId: number, @Body() updateToyRequest: UpdateToyDTO) {
        const resp = await this.toyService.updateOne(toyId, updateToyRequest);
        return resp;
    }

    @Delete()
    public async deleteOne(@Param("id") toyId: number) {
        const resp = await this.toyService.deleteOne(toyId)
        return resp;
    }
}
