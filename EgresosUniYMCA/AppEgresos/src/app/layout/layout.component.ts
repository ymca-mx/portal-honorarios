import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(public router: Router, private layoutService: LayoutService) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/home']);
        }
      
    }

}
