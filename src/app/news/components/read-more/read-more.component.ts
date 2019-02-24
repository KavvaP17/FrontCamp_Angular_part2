import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit, OnDestroy {

  public readMoreForm: FormGroup;
  public source: string;
  public id: number;
  public newsItem = null;
  public user = null;

  @Output() onDeleteNews = new EventEmitter<string>();

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private configService: ConfigService,
              private fb: FormBuilder,
              private newsService: NewsApiService,
              public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    const userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.readMoreForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(500)],
      date: [''],
      duration: [0],
      authors: [[]]
    });

    const queryParamsSub = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.source){
        this.source = this.configService.getSourceLabelByValue(params.source);
      } else {
        this.router.navigate(['news']);
      }
    });

    const paramsSub = this.activatedRoute.params.subscribe(params => {
      this.id = +params.id;
      this.newsItem = this.newsService.getNewsById(this.id);
      if(!this.newsItem) {
        this.router.navigate(['news']);
      }
    });

    this.subscriptions.push(userSub, queryParamsSub, paramsSub);

  }

  back() {
    this.router.navigate(['news'], { queryParams: { source: this.newsItem.source.id} });
  }

  public delete(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '235px',
      data: {title: 'news'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.deleteNews(this.newsItem._id)
          .then(() => {
            this.router.navigate(['news']);
          })
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {sub.unsubscribe()});
  }

  isDisabled() {
    return !this.newsItem || !this.newsItem.source || this.newsItem.source.id !== 'local-news' 
      || !this.user || this.newsItem.author_id !== this.user._id;
  }

}
