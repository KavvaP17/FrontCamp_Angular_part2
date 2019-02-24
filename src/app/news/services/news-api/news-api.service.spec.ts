import { TestBed, inject } from '@angular/core/testing';

import { NewsApiService } from './news-api.service';
import { Response, ResponseOptions } from '@angular/http';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { AuthMockService } from 'src/app/auth/mock/auth.mock.service';
import { FilterService } from '../filter/filter.service';
import { FilterMockService } from '../../mock/filter.mock.service';

const mockResponceData = [
  {
    author: 'author',
    author_id: '1',
    content: 'content',
    description: 'description',
    publishedAt: 'publishedAt',
    title: 'title',
    url: '',
    urlToImage: '',
    source: {
      label: 'login',
      id: 'password'
    }
  },
  {
    author: 'author1',
    author_id: 'author_id1',
    content: 'content1',
    description: 'description1',
    publishedAt: 'publishedAt1',
    title: 'title1',
    url: '',
    urlToImage: '',
    source: {
      label: 'login1',
      id: 'password1'
    }
  }
];

describe('NewsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AuthService, useClass: AuthMockService },
      { provide: FilterService, useClass: FilterMockService },
    ]
  }));

  it('should be created', () => {
    const service: NewsApiService = TestBed.get(NewsApiService);
    expect(service).toBeTruthy();
  });

  it('getData method should return local news', inject([NewsApiService], async(service: NewsApiService) => {

    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify(mockResponceData)
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponce));


    let res = await service.getData('local-news', 5, 'false');
    
    expect(fetchSpy).toHaveBeenCalled();
    expect(res.length).toBe(2);

    res = await service.getData('local-news', 5, 'true');

    expect(res.length).toBe(1);

  }));

  it('getData method should return not local news', inject([NewsApiService], async(service: NewsApiService) => {

    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify({articles : mockResponceData})
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponce));


    let res = await service.getData('not-local-news', 5, 'true');
    
    expect(fetchSpy).toHaveBeenCalled();
    expect(res.length).toBe(2);

    res = await service.getData('not-local-news', 5, 'false');

    expect(res.length).toBe(2);
  }));

  it('loadMore method should return local news', inject([NewsApiService], async(service: NewsApiService) => {
    service.currentNews = [];
    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify(mockResponceData)
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponce));


    let res = await service.loadMore('local-news', 'false');
    
    expect(fetchSpy).toHaveBeenCalled();
    expect(res.length).toBe(2);

    res = await service.loadMore('local-news', 'true');

    expect(res.length).toBe(1);

  }));

  it('loadMore method should return not local news', inject([NewsApiService], async(service: NewsApiService) => {
    service.currentNews = [];
    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify({articles : mockResponceData})
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponce));


    let res = await service.loadMore('not-local-news', 'true');
    
    expect(fetchSpy).toHaveBeenCalled();
    expect(res.length).toBe(2);

    res = await service.loadMore('not-local-news', 'false');

    expect(res.length).toBe(2);
  }));

  it('updateNews method should update local news', inject([NewsApiService], async(service: NewsApiService) => {

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve());

    await service.updateNews(<any>mockResponceData[0], '0');
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('deleteNews method should delete local news', inject([NewsApiService], async(service: NewsApiService) => {

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve());

    await service.deleteNews('0');    
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('addNews method should add local news', inject([NewsApiService], async(service: NewsApiService) => {

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve());

    await service.addNews(<any>mockResponceData[0]);    
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('getNewsById method should return news by id', inject([NewsApiService], (service: NewsApiService) => {
    service.currentNews = mockResponceData;

    expect(service.getNewsById(0)).toEqual(mockResponceData[0]);
    expect(service.getNewsById(123)).toBeFalsy();
  }));


});
