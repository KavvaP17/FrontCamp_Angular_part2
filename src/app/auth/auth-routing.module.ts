import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        data: {
            isAuthRouteActivate: true
        }
    },
    {
        path: 'auth/registration',
        component: RegistrationComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }