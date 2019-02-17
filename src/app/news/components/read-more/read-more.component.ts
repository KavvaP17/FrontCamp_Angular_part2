import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit, OnDestroy {

  public readMoreForm: FormGroup;
  public source: string;
  public id: number;
  public newsItem;

  @Output() onDeleteNews = new EventEmitter<string>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private configService: ConfigService,
              private fb: FormBuilder,
              private newsService: NewsApiService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.readMoreForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(500)],
      date: [''],
      duration: [0],
      authors: [[]]
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.source = this.configService.getSourceLabelByValue(params.source);
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = +params.id;
      this.newsItem = this.newsService.getNewsById(this.id);
    })

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

  ngOnDestroy() {}

  isDisabled() {
    return !this.newsItem.source || this.newsItem.source.id !== 'local-news' 
  }

}
