import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsConfigPanelComponent } from './news-config-panel.component';
import { MatSelectModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import newsRoutes from '../../mock/news-routers';
import { AddNewsStubComponent } from '../add-news/add-news.stub.component';
import { EditNewsStubComponent } from '../edit-news/edit-news.stub.component';
import { ReadMoreStubComponent } from '../read-more/read-more.stub.component';
import { NewsStubComponent } from '../../news.stub.component';

describe('NewsConfigPanelComponent', () => {
  let component: NewsConfigPanelComponent;
  let fixture: ComponentFixture<NewsConfigPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(newsRoutes),
        BrowserAnimationsModule
      ],
      declarations: [ 
        NewsConfigPanelComponent,
        AddNewsStubComponent,
        EditNewsStubComponent,
        ReadMoreStubComponent,
        NewsStubComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
