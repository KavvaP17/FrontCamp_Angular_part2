import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { NewsSourceStubComponent } from './components/news-source/news-source.stub.component';
import { LoadMoreStubComponent } from './components/load-more/load-more.stub.component';
import { NewsListStubComponent } from './components/news-list/news-list.stub.component';
import { NewsConfigPanelStubComponent } from './components/news-config-panel/news-config-panel.stub.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddNewsStubComponent } from './components/add-news/add-news.stub.component';
import { EditNewsStubComponent } from './components/edit-news/edit-news.stub.component';
import { ReadMoreStubComponent } from './components/read-more/read-more.stub.component';
import { NewsStubComponent } from './news.stub.component';
import newsRoutes from './mock/news-routers';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(newsRoutes)
      ],
      declarations: [ 
        NewsComponent,
        NewsSourceStubComponent,
        LoadMoreStubComponent,
        NewsListStubComponent,
        NewsConfigPanelStubComponent,
        AddNewsStubComponent,
        EditNewsStubComponent,
        ReadMoreStubComponent,
        NewsStubComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
