import { Test, TestingModule } from '@nestjs/testing';
import { DataHashService } from './data_hash.service';

describe('DataHashService', () => {
  let service: DataHashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataHashService],
    }).compile();

    service = module.get<DataHashService>(DataHashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
