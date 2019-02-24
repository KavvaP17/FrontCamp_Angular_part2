import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter/filter.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'news-config-panel',
  templateUrl: './news-config-panel.component.html',
  styleUrls: ['./news-config-panel.component.scss']
})
export class NewsConfigPanelComponent implements OnInit, OnChanges {
  onlyCreatedByMe: boolean = false;
  filterValue: string;
  channels : Channel[];
  selectedChannel: string;
  @Input() source: string;
  @Input() user;
  @Output() onChangedChannel = new EventEmitter<Channel>();
  @Output() onFilter = new EventEmitter<void>();

  constructor(private configService: ConfigService,
              private router: Router,
              private filterService: FilterService) { }

  ngOnInit() {
    this.filterValue = this.filterService.filterValue;
    this.channels = this.configService.newsApi.channels;
    if (this.source) {
      this.selectedChannel = this.channels.find(channel => channel.label === this.source).value;
    } else {
      this.selectedChannel = this.channels[0].value;
    }
    this.router.navigate(['/news'], { queryParams: { source: this.selectedChannel}});
  }

  ngOnChanges() {
    if(!this.user) {
      this.onlyCreatedByMe = false;
    }
  }

  changeChannel(channelValue) {
    this.router.navigate(['/news'], { queryParams: { source: channelValue.value}});
  }

  setFilterValue() {
    this.filterService.filterValue = this.filterValue;
    this.onFilter.emit();
  }
  onlyCreatedByMeChanged(value) {
    this.onlyCreatedByMe = value;
    if (value) {
      this.selectedChannel = this.channels[0].value;
    }
    this.router.navigate(['/news'], { queryParams: { source: this.selectedChannel, createdByMe: this.onlyCreatedByMe}});
  }
}

export interface Channel {
  value: string;
  label: string;
}
