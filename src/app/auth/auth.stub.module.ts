import { NgModule } from '@angular/core';
import { AuthStubComponent } from './auth.stub.component';
import { RegistrationStubComponent } from './components/registration/registration.stub.component';

@NgModule({
    declarations: [
        AuthStubComponent,
        RegistrationStubComponent
    ],
    exports: [AuthStubComponent]
})
export class AuthStubModule { }
