import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { NewsSourceComponent } from './components/news-source/news-source.component';
import { NewsConfigPanelComponent } from './components/news-config-panel/news-config-panel.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsComponent } from './news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsApiService } from './services/news-api/news-api.service';
import { NewsRoutingModule } from './news-routing.module';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { FilterService } from './services/filter/filter.service';

@NgModule({
  declarations: [
    NewsSourceComponent, 
    NewsConfigPanelComponent, 
    LoadMoreComponent, 
    NewsListComponent, 
    NewsItemComponent, 
    NewsComponent, 
    AddNewsComponent,
    DialogComponent,
    EditNewsComponent,
    ReadMoreComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule
  ],
  providers: [
    NewsApiService,
    FilterService
  ],
  exports: [
    NewsComponent,
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class NewsModule { }
