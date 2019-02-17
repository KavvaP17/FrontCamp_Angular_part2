import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NewsApiService } from './services/news-api/news-api.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../core/services/config/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy{
  channel: {label: string, value: string}
  source: string;
  newsList = [];

  private subscriptions: Subscription[] = [];

  constructor(private newsApiService: NewsApiService,
              private activatedRoute: ActivatedRoute,
              private configService: ConfigService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const routerParamsSub = this.activatedRoute.queryParams.subscribe(params => {
      if (params.source) {
        const channel = this.configService.newsApi.channels
          .find(_channel => _channel.value === params.source);
        this.changedChannel(channel);
      } else {
        this.changedChannel(this.configService.newsApi.channels[0]);
      }
    });
    this.subscriptions.push(routerParamsSub);
  }

  changedChannel(channel) {
    this.channel = channel;
    this.source = channel.label;
    this.newsApiService.getData(channel.value, 5).then(newsList => {
      this.source = channel.label;
      this.newsList = newsList;
      this.cd.markForCheck();
    });

  }

  loadMore() {
    this.newsApiService.loadMore(this.channel.value)
    .then(newsList => {
      this.newsList = newsList;
      this.cd.markForCheck();
    });
  }

  deleteNews() {
    this.changedChannel(this.channel);
  }

  filter() {
    this.changedChannel(this.channel);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
