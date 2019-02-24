import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NewsApiService } from './services/news-api/news-api.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../core/services/config/config.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth/auth.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy{
  channel: {label: string, value: string}
  source: string;
  user: null;
  newsList = [];
  createdByMe: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private newsApiService: NewsApiService,
              private activatedRoute: ActivatedRoute,
              private configService: ConfigService,
              private authService: AuthService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const routerParamsSub = this.activatedRoute.queryParams.subscribe(params => {
      this.createdByMe = params.createdByMe ? params.createdByMe : false;
      if (params.source) {
        const channel = this.configService.newsApi.channels
          .find(_channel => _channel.value === params.source);
        this.changedChannel(channel, this.createdByMe);
      } else {
        this.changedChannel(this.configService.newsApi.channels[0], this.createdByMe);
      }
    });

    const userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.cd.markForCheck();
    })
    this.subscriptions.push(routerParamsSub, userSub);
  }

  changedChannel(channel, createdByMe) {
    this.channel = channel;
    this.source = channel.label;
    this.newsApiService.getData(channel.value, 5, createdByMe).then(newsList => {
      this.source = channel.label;
      this.newsList = newsList;
      this.cd.markForCheck();
    });

  }

  loadMore() {
    this.newsApiService.loadMore(this.channel.value, this.createdByMe)
    .then(newsList => {
      this.newsList = newsList;
      this.cd.markForCheck();
    });
  }

  deleteNews() {
    this.changedChannel(this.channel, this.createdByMe);
  }

  filter() {
    this.changedChannel(this.channel, this.createdByMe);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
