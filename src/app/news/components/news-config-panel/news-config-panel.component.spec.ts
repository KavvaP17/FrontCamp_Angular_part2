import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsConfigPanelComponent } from './news-config-panel.component';

describe('NewsConfigPanelComponent', () => {
  let component: NewsConfigPanelComponent;
  let fixture: ComponentFixture<NewsConfigPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsConfigPanelComponent ]
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
