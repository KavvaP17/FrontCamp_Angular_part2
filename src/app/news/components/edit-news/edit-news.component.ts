import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { Location } from '@angular/common';
import News from '../../classes/News';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit, OnDestroy {

  public editNewsForm: FormGroup;
  public newsItem;
  public source;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private newsService: NewsApiService,
    private location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.newsItem = this.newsService.getNewsById(+params.id);
      this.source =  this.newsItem.source.id;
      this.editNewsForm = this.fb.group({
        title: [this.newsItem.title, [Validators.required, Validators.maxLength(50)]],
        description: [this.newsItem.description, Validators.maxLength(200)],
        content: [this.newsItem.content, Validators.maxLength(500)],
        image: [this.newsItem.urlToImage],
        date: [this.newsItem.publishedAt],
        author: [this.newsItem.author],
        url: [this.newsItem.url]
      });
    });
  }

  public close() {
    this.location.back();
  }

  public save() {
    const editedNews = new News(this.editNewsForm.controls.title.value, this.editNewsForm.controls.author.value, this.editNewsForm.controls.description.value,
      this.editNewsForm.controls.url.value, this.editNewsForm.controls.image.value, this.editNewsForm.controls.date.value, this.editNewsForm.controls.content.value); 
    this.newsService.updateNews(editedNews, this.newsItem._id)
      .then(() => {
        this.router.navigate(['news'], { queryParams: { source: this.source } });
      })
  }

  ngOnDestroy() {}

}
