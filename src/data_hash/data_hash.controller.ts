import { Controller } from '@nestjs/common';
import { DataHashService } from './data_hash.service';

@Controller('data-hash')
export class DataHashController {
  constructor(private readonly dataHashService: DataHashService) {}
}
