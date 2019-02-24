import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { Location } from '@angular/common';
import News from '../../classes/News';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit, OnDestroy {

  public editNewsForm: FormGroup;
  public newsItem;
  public source;
  public user;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private newsService: NewsApiService,
    private location: Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.newsItem = this.newsService.getNewsById(+params.id);
      if(!this.newsItem) {
        this.router.navigate(['news']);
      }
      this.source =  this.newsItem.source.id;
      this.editNewsForm = this.fb.group({
        title: [this.newsItem.title, [Validators.required, Validators.maxLength(50)]],
        description: [this.newsItem.description, Validators.maxLength(200)],
        content: [this.newsItem.content, Validators.maxLength(500)],
        image: [this.newsItem.urlToImage],
        date: [this.newsItem.publishedAt],
        url: [this.newsItem.url]
      });
    });

    const userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.subscriptions.push(userSub);
  }

  public close() {
    this.location.back();
  }

  public save() {
    const editedNews = new News(this.editNewsForm.controls.title.value, this.user.local.login, this.user._id, this.editNewsForm.controls.description.value,
      this.editNewsForm.controls.url.value, this.editNewsForm.controls.image.value, this.editNewsForm.controls.date.value, this.editNewsForm.controls.content.value); 
    this.newsService.updateNews(editedNews, this.newsItem._id)
      .then(() => {
        this.router.navigate(['news'], { queryParams: { source: this.source } });
      })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {sub.unsubscribe()});
  }

}
