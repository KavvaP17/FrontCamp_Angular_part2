import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsStubComponent } from './news.stub.component';
import { ReadMoreStubComponent } from './components/read-more/read-more.stub.component';
import { EditNewsStubComponent } from './components/edit-news/edit-news.stub.component';
import { AddNewsStubComponent } from './components/add-news/add-news.stub.component';

const routes: Routes = [
    {
        path: 'news/add',
        component: AddNewsStubComponent,
    },
    {
        path: 'news/edit/:id',
        component: EditNewsStubComponent,
    },
    {
        path: 'news/read/:id',
        component: ReadMoreStubComponent
    },
    {
        path: 'news',
        component: NewsStubComponent
    }
 ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class NewsRoutingStubModule { }