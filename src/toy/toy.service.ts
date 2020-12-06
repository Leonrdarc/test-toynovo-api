import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateToyDTO } from 'src/dto/create-toy.dto';
import { UpdateToyDTO } from 'src/dto/update-toy.dto';
import { Toy } from 'src/entity/toy.entity';
import { Repository } from 'typeorm';
import fs = require('fs');

@Injectable()
export class ToyService {
    constructor(@InjectRepository(Toy) private toyRepository: Repository<Toy>) {}

    public async createOne(createToyRequest: CreateToyDTO, imgPath: string) { 
        const toy: Toy = new Toy();
        toy.name = createToyRequest.name;
        toy.description = createToyRequest.description;
        toy.price = createToyRequest.price;
        toy.img = imgPath;

        await this.toyRepository.save(toy);
        return toy;
    }

    public async getAll() {
        return await this.toyRepository.find();
    }

    public async updateOne(toyId: number, updateOneRequest: UpdateToyDTO, imgPath?: string) {
        const toy = await this.toyRepository.findOne(toyId);

        //Check if there is a new img to delete de older
        if(imgPath){
            try {
                fs.unlinkSync(toy.img)
                //file removed
            } catch(err) {
                console.error(err)
            }
        }

        //Checks and asigns if exists the field on the request
        toy.name = updateOneRequest.name || toy.name;
        toy.description = updateOneRequest.description || toy.description;
        toy.price = updateOneRequest.price || toy.price;
        toy.img = imgPath || toy.img;

        await this.toyRepository.save(toy);

        return toy;
    }

    public async deleteOne(toyId: number){
        const toy = await this.toyRepository.findOne(toyId);

        await this.toyRepository.remove(toy);
        
        return {message: "Succesfully deleted"};
    }
}
