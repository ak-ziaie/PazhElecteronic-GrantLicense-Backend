import { Test, TestingModule } from '@nestjs/testing';
import { AdminmomdulesService } from './adminmomdules.service';

describe('AdminmomdulesService', () => {
  let service: AdminmomdulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminmomdulesService],
    }).compile();

    service = module.get<AdminmomdulesService>(AdminmomdulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
