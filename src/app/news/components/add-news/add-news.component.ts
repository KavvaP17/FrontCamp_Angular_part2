import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsApiService } from '../../services/news-api/news-api.service';
import News from '../../classes/News';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit, OnDestroy {

  public user;
  public newsForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private newsApiService: NewsApiService,
              private authService: AuthService) { }

  ngOnInit() {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(200)],
      content: ['', Validators.maxLength(500)],
      image: [''],
      date: [''],
      url: ['']
    });

    const userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.subscriptions.push(userSub);
  }

  public close() {
    this.router.navigate(['news'], { queryParams: { source: 'local-news'} });
  }

  public save() {
    const addedNews = new News(this.newsForm.controls.title.value, this.user.local.login, this.user._id, this.newsForm.controls.description.value,
      this.newsForm.controls.url.value, this.newsForm.controls.image.value, this.newsForm.controls.date.value, this.newsForm.controls.content.value); 
    this.newsApiService.addNews(addedNews)
      .then(() => {
        this.router.navigate(['news'], { queryParams: { source: 'local-news'} });
      })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {sub.unsubscribe()});
  }

}
