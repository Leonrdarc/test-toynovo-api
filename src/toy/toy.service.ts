import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateToyDTO } from 'src/dto/create-toy.dto';
import { UpdateToyDTO } from 'src/dto/update-toy.dto';
import { Toy } from 'src/entity/toy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToyService {
    constructor(@InjectRepository(Toy) private toyRepository: Repository<Toy>) {}

    public async createOne(createToyRequest: CreateToyDTO) { 
        const toy: Toy = new Toy();
        toy.title = createToyRequest.title;
        toy.description = createToyRequest.description;
        toy.img = createToyRequest.img;

        await this.toyRepository.save(toy);
        return toy;
    }

    public async getAll() {
        return await this.toyRepository.find();
    }

    public async updateOne(toyId: number, updateOneRequest: UpdateToyDTO) {
        const toy = await this.toyRepository.findOne(toyId);

        //Asigna si existe o no en el request
        toy.title = updateOneRequest.title || toy.title;
        toy.description = updateOneRequest.description || toy.description;
        toy.img = updateOneRequest.img || toy.img;

        await this.toyRepository.save(toy);

        return toy;
    }

    public async deleteOne(toyId: number){
        const toy = await this.toyRepository.findOne(toyId);

        await this.toyRepository.remove(toy);
        
        return {message: "Succesfully deleted"};
    }
}
