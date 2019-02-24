import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsComponent } from './edit-news.component';
import { MatSelectModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import newsRoutes from '../../mock/news-routers';
import { AddNewsStubComponent } from '../add-news/add-news.stub.component';
import { EditNewsStubComponent } from '../edit-news/edit-news.stub.component';
import { ReadMoreStubComponent } from '../read-more/read-more.stub.component';
import { NewsStubComponent } from '../../news.stub.component';
import { NewsSourceStubComponent } from '../news-source/news-source.stub.component';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { NewsApiMockService } from '../../mock/news-api.mock.service';

describe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(newsRoutes),
        BrowserAnimationsModule
      ],
      declarations: [ 
        EditNewsComponent,
        AddNewsStubComponent,
        EditNewsStubComponent,
        ReadMoreStubComponent,
        NewsSourceStubComponent,
        NewsStubComponent 
      ],
      providers: [
        { provide: NewsApiService, useClass: NewsApiMockService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
