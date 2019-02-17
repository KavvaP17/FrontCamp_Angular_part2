import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-source',
  templateUrl: './news-source.component.html',
  styleUrls: ['./news-source.component.scss']
})
export class NewsSourceComponent implements OnInit {

  @Input() source: string;

  constructor() { }

  ngOnInit() {
  }

}
