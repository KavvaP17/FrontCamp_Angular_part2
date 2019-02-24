import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModuleStub } from './core/core.stub.module';
import { InitIconsService } from './core/services/init-icons/init-icons.service';
import { InitIconsMockService } from './core/mock/init-icons.mock.service';
import { LoadingService } from './core/services/loading/loading.service';
import { LoadingMockService } from './core/mock/loading.mock.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModuleStub
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: InitIconsService, useClass: InitIconsMockService },
        { provide: LoadingService, useClass: LoadingMockService },

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
