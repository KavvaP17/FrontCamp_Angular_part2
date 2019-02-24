import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import News from '../../classes/News';
import { FilterService } from '../filter/filter.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  public currentNews = [];

  constructor(private configService: ConfigService,
              private loadingService: LoadingService,
              private filterService: FilterService,
              private authService: AuthService) { }

  getData(channel: string, recordCount: number, createdByMe: string) {
    this.loadingService.setIsLoadingValue(false);
    switch(channel) {
      case 'local-news':
        return fetch(this.getLocalUrl())
          .then(response => response.json())
          .then(result => {
            result.forEach(res => {
              res.source = {
                id: 'local-news',
                label: 'Local News'
              }
            });
            if (createdByMe === 'true') {
              const userId = this.authService.user.getValue()._id;
              result = result.filter(res => res.author_id === userId);
            }
            this.currentNews = result.slice(0, recordCount);;
            this.loadingService.setIsLoadingValue(true);
            return this.filterService.filter(this.currentNews);
          })
          .catch((err) => {
            this.loadingService.setIsLoadingValue(true);
          });
      default: 
        const url = this.getUrl(channel, recordCount);
        return fetch(url)
          .then(response => response.json())
          .then(result => {
            this.currentNews = result.articles;
            this.loadingService.setIsLoadingValue(true);
            return this.filterService.filter(this.currentNews);
          })
          .catch((err) => {
            this.loadingService.setIsLoadingValue(true);
          });
    }
  }

  loadMore(channel, createdByMe) {
    this.loadingService.setIsLoadingValue(false);
    switch(channel) {
      case 'local-news':
        return fetch(this.getLocalUrl())
        .then(response => response.json())
        .then(result => {
          result.forEach(res => {
            res.source = {
              id: 'local-news',
              label: 'Local News'
            }
          });
          if (createdByMe === 'true') {
            const userId = this.authService.user.getValue()._id;
            result = result.filter(res => res.author_id === userId);
          }
          this.currentNews = result.slice(0, this.currentNews.length + 5);
          this.loadingService.setIsLoadingValue(true);
          return this.filterService.filter(this.currentNews);
        })
        .catch((err) => {
          this.loadingService.setIsLoadingValue(true);
        });
      default: 
        const url = this.getUrl(channel, this.currentNews.length + 5);
        return fetch(url)
          .then(response => response.json())
          .then(result => {
            this.currentNews = result.articles;
            this.loadingService.setIsLoadingValue(true);
            return this.filterService.filter(this.currentNews);
          })
          .catch((err) => {
            this.loadingService.setIsLoadingValue(true);
          });
    }
  }

  updateNews(news: News, id: string): Promise<void> {
    this.loadingService.setIsLoadingValue(false);
    return fetch(`http://localhost:3000/news/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify(
            {
              title: news.title,
              author: news.author,
              description: news.description,
              url: news.url,
              urlToImage: news.urlToImage,
              publishedAt: news.publishedAt,
              content: news.content
            }
          )
      }).then(() => {
        this.loadingService.setIsLoadingValue(true);
      })
      .catch((err) => {
        this.loadingService.setIsLoadingValue(true);
      });
  }

  deleteNews(id: string): Promise<void> {
    this.loadingService.setIsLoadingValue(false);
    return fetch(`http://localhost:3000/news/${id}`, {
        method: 'DELETE'
      }).then(() => {
        this.loadingService.setIsLoadingValue(true);
      })
  }

  addNews(news: News): Promise<void> {
    this.loadingService.setIsLoadingValue(false);
    return fetch('http://localhost:3000/news', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(
            {
              title: news.title,
              author: news.author,
              author_id: news.author_id,
              description: news.description,
              url: news.url,
              urlToImage: news.urlToImage,
              publishedAt: news.publishedAt,
              content: news.content
            }
          )
      }).then(() => {
        this.loadingService.setIsLoadingValue(true);
      })
  }

  getNewsById(id) {
    return this.currentNews[id];
  }

  private getUrl(channel, recordCount) {
    return `${this.configService.newsApi.url}sources=${channel}&pageSize=${recordCount}&apiKey=${this.configService.newsApi.apiKey}`;
  }

  private getLocalUrl() {
    return `http://localhost:3000/news`;
  }
  
}
