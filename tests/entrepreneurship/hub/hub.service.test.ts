import { Test, TestingModule } from '@nestjs/testing';
import { HubService } from './hub.service';
import { Hub } from './hub.entity';

describe('HubService', () => {
  let hubService: HubService;
  let hub: Hub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubService],
    }).compile();

    hubService = module.get<HubService>(HubService);
    hub = new Hub('EmpowHerNet Hub', 'This is a hub for entrepreneurship');
  });

  it('should be defined', () => {
    expect(hubService).toBeDefined();
  });

  describe('createHub', () => {
    it('should create a new hub', async () => {
      const result = await hubService.createHub(hub);
      expect(result).toBe(hub);
    });
  });

  describe('getHub', () => {
    it('should return a hub by id', async () => {
      const result = await hubService.getHub(hub.id);
      expect(result).toBe(hub);
    });
  });

  describe('getHubs', () => {
    it('should return a list of hubs', async () => {
      const hubs = await hubService.getHubs();
      expect(hubs).toContain(hub);
    });
  });
});
