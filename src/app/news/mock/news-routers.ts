import { Routes } from "@angular/router";
import { AddNewsStubComponent } from '../components/add-news/add-news.stub.component';
import { EditNewsStubComponent } from '../components/edit-news/edit-news.stub.component';
import { ReadMoreStubComponent } from '../components/read-more/read-more.stub.component';
import { NewsStubComponent } from '../news.stub.component';

const newsRoutes: Routes = [
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

export default newsRoutes;