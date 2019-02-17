import { Component, OnInit } from '@angular/core';
import { InitIconsService } from './core/services/init-icons/init-icons.service';
import { LoadingService } from './core/services/loading/loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fc-angular';
  isLoading: BehaviorSubject<boolean>;

  constructor(private initIconsService: InitIconsService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.initIconsService.init();
    this.isLoading = this.loadingService.isLoading;
  }

}
