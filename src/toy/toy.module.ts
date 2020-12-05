import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toy } from 'src/entity/toy.entity';
import { ToyController } from './toy.controller';
import { ToyService } from './toy.service';

@Module({
  controllers: [ToyController],
  providers: [ToyService],
  imports: [TypeOrmModule.forFeature([Toy])]
})
export class ToyModule {}
