import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy{
    
    isAuthenticated: boolean;
    isAuthFormActivated: boolean = false;
    currentUser: string;
    private subscriptions: Subscription[] = [];

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        const authSub = this.authService.isAuthenticated.subscribe((isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;
        });

        const userSub =  this.authService.user.subscribe((user) => {
            console.log(user);
            if (user) {
                this.currentUser = user.local.login;
            } else {
                this.currentUser = "Guest";
            }
        })

        const routerSub = this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.isAuthFormActivated = this.router.url.indexOf('/auth') >= 0;
                }
            }
        );

        this.subscriptions.push(authSub, routerSub, userSub);
    }

    public logout(): void {
        this.authService.logout(); 
    }

    public login(): void {
        this.router.navigate(['/auth']); 
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => { sub.unsubscribe()});
    }

}
