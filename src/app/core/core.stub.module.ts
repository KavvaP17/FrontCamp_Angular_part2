import { NgModule } from '@angular/core';
import { HeaderStubComponent } from './components/header/header.stub.component';
import { FooterStubComponent } from './components/footer/footer.stub.component';
import { LogoStubComponent } from './components/logo/logo.stub.component';
import { LogoutStubComponent } from './components/logout/logout.stub.component';
import { PageNotFoundStubComponent } from './components/page-not-found/page-not-found.stub.component';
import { LoadingStubComponent } from './components/loading/loading.stub.component';

@NgModule({
  declarations: [
    HeaderStubComponent,
    FooterStubComponent,
    LogoStubComponent,
    LogoutStubComponent,
    PageNotFoundStubComponent,
    LoadingStubComponent
  ],
  exports: [
    HeaderStubComponent,
    FooterStubComponent,
    PageNotFoundStubComponent,
    LoadingStubComponent
  ]
})
export class CoreModuleStub { }
