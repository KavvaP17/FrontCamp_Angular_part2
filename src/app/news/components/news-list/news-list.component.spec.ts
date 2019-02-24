import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { NewsItemStubComponent } from '../news-item/news-item.stub.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        NewsListComponent,
        NewsItemStubComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
