import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    listMenu;

    constructor(private http: Http) {
        this.http
            .get('api/Menu').subscribe(result => {
                this.listMenu = result.json();
            });
    }

}
