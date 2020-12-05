import { Test, TestingModule } from '@nestjs/testing';
import { ToyController } from './toy.controller';

describe('ToyController', () => {
  let controller: ToyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToyController],
    }).compile();

    controller = module.get<ToyController>(ToyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
