import { Component } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'MenuComponent',
    templateUrl: './menu.component.html',
    styleUrls:['../app.component.css']
})
export class MenuComponent {
    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }

    listMenu;

    constructor(private http: Http) {
        this.http
            .get('api/Menu').subscribe(result => {
                this.listMenu = result.json();
            });
     }
    
}