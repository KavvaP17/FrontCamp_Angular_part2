import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NewsApiService } from '../../services/news-api/news-api.service';
import News from '../../classes/News';

@Component({
  selector: 'add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit, OnDestroy {

  public newsForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private newsApiService: NewsApiService,
              ) { }

  ngOnInit() {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(200)],
      content: ['', Validators.maxLength(500)],
      image: [''],
      date: [''],
      author: [''],
      url: ['']
    });
  }

  public close() {
    this.router.navigate(['news'], { queryParams: { source: 'local-news'} });
  }

  public save() {
    const addedNews = new News(this.newsForm.controls.title.value, this.newsForm.controls.author.value, this.newsForm.controls.description.value,
      this.newsForm.controls.url.value, this.newsForm.controls.image.value, this.newsForm.controls.date.value, this.newsForm.controls.content.value); 
    this.newsApiService.addNews(addedNews)
      .then(() => {
        this.router.navigate(['news'], { queryParams: { source: 'local-news'} });
      })
  }

  ngOnDestroy() {}

}
