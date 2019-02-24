import News from '../classes/News';

const mockNews = [
  {
    author: 'test1',
    author_id: 'test1',
    content: 'test1',
    description: 'test1',
    publishedAt: '',
    title: 'test1',
    url: '',
    urlToImage: '',
    source: {label: 'test1', id: 'test1'}
  },
  {
    author: 'test2',
    author_id: 'test2',
    content: 'test2',
    description: 'test2',
    publishedAt: '',
    title: 'test2',
    url: '',
    urlToImage: '',
    source: {label: 'test2', id: 'test2'}
  }
]
export class NewsApiMockService {

  public currentNews;

  constructor() { }

  getData(channel, recordCount, createdByMe) {
    return Promise.resolve(mockNews);
  }

  loadMore(channel, createdByMe) {
    return Promise.resolve(mockNews);
  }

  updateNews(news: News, id: string): Promise<void> {
   return Promise.resolve();
  }

  deleteNews(id: string): Promise<void> {
   return Promise.resolve();
  }

  addNews(news: News): Promise<void> {
    return Promise.resolve();
  }

  getNewsById(id) {
    return mockNews[0];
  }
  
}
