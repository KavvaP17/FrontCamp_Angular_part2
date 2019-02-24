import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });

  it('getSourceLabelByValue method should return label of source', () => {
    service.newsApi.channels.forEach(channel => {
      expect(service.getSourceLabelByValue(channel.value)).toBe(channel.label);
    })

    expect(service.getSourceLabelByValue('fake value')).toBe('');    
  })
});
