import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddNewsStubComponent } from '../add-news/add-news.stub.component';
import { EditNewsStubComponent } from '../edit-news/edit-news.stub.component';
import { ReadMoreStubComponent } from '../read-more/read-more.stub.component';
import { NewsStubComponent } from '../../news.stub.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import newsRoutes from '../../mock/news-routers';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(newsRoutes)
      ],
      declarations: [ 
        NewsItemComponent,
        AddNewsStubComponent,
        EditNewsStubComponent,
        ReadMoreStubComponent,
        NewsStubComponent 
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.newsItem = <any>{source: {label: 'test', id: '123'}}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isDisabled method should return disabled status', () => {
    expect(component.isDisabled()).toBeTruthy();

    component.user = {
      _id: '1'
    }
    expect(component.isDisabled()).toBeTruthy();

    component.newsItem = <any>{
      author_id: '2',
      source: {
        id: 'local-news',
        label: 'local-news'
      }
    }
    expect(component.isDisabled()).toBeTruthy();

    component.newsItem.author_id = '1';
    expect(component.isDisabled()).toBeFalsy();

  })


});
