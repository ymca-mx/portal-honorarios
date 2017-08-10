import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    homeDetails: HomeDetails;
    constructor(public router: Router, private layoutService: LayoutService) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/home']);
        }
        
        this.layoutService.getHomeDetails()
            .subscribe((homeDetails: HomeDetails) => {
                this.homeDetails = homeDetails;
            },
            error => {
                // this.notificationService.printErrorMessage(error);
                alert(error);
                this.router.navigate(['/login']);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            });

    }

}

export interface HomeDetails {
    message: string;
}