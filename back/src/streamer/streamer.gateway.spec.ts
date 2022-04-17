import { Test, TestingModule } from '@nestjs/testing';
import { StreamerGateway } from './streamer.gateway';
import { StreamerService } from './streamer.service';

describe('StreamerGateway', () => {
  let gateway: StreamerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamerGateway, StreamerService],
    }).compile();

    gateway = module.get<StreamerGateway>(StreamerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
