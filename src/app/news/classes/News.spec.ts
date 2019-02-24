import News from './News';

describe('News class', () => {
    let news: News;

    beforeEach(() => {
        news = new News('title', 'author', 'author_id', 'description',
        'url', 'urlToImage', 'publishedAt', 'content', 'id');
    });

    it('should be created', () => {
        expect(news.title).toBe('title');
        expect(news.author).toBe('author');
        expect(news.author_id).toBe('author_id');
        expect(news.description).toBe('description');
        expect(news.url).toBe('url');
        expect(news.urlToImage).toBe('urlToImage');
        expect(news.publishedAt).toBe('publishedAt');
        expect(news.content).toBe('content');
        expect(news.id).toBe('id');
    });
});
