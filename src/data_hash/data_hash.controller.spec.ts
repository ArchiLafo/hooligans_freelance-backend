import { Test, TestingModule } from '@nestjs/testing';
import { DataHashController } from './data_hash.controller';
import { DataHashService } from './data_hash.service';

describe('DataHashController', () => {
  let controller: DataHashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataHashController],
      providers: [DataHashService],
    }).compile();

    controller = module.get<DataHashController>(DataHashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
