import { Test, TestingModule } from '@nestjs/testing';
import { Hub } from './hub.entity';
import { HubService } from './hub.service';

describe('HubModel', () => {
  let hub: Hub;

  beforeEach(() => {
    hub = new Hub('EmpowHerNet Hub', 'This is a hub for entrepreneurship');
  });

  it('should be defined', () => {
    expect(hub).toBeDefined();
  });

  describe('name', () => {
    it('should have a name', () => {
      expect(hub.name).toBe('EmpowHerNet Hub');
    });
  });

  describe('description', () => {
    it('should have a description', () => {
      expect(hub.description).toBe('This is a hub for entrepreneurship');
    });
  });
});
