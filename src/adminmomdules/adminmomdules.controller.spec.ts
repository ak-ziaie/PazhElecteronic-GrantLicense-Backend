import { Test, TestingModule } from '@nestjs/testing';
import { AdminmomdulesController } from './adminmomdules.controller';
import { AdminmomdulesService } from './adminmomdules.service';

describe('AdminmomdulesController', () => {
  let controller: AdminmomdulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminmomdulesController],
      providers: [AdminmomdulesService],
    }).compile();

    controller = module.get<AdminmomdulesController>(AdminmomdulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
