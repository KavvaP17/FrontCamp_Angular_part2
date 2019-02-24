import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @Input() newsList;
  @Input() user;
  @Output() onDeleteNews = new EventEmitter<void>();

  constructor(
    private newsApiService: NewsApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteNews(id) {
    this.newsApiService.deleteNews(this.newsList[id]._id)
      .then(() => {
        this.onDeleteNews.emit();
      })
  }

}
