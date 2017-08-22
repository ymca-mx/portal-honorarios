import { Component } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { LayoutService } from '../../../layout/services/layout.service'; 

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    public headers = this.layoutService.setHeaders();
    public options = new RequestOptions({ headers: this.headers });

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

    constructor(private http: Http, private layoutService :LayoutService) {
        this.http
            .get('api/Account/menu', this.options).subscribe(
            result => {
                this.listMenu = result.json();
            },
            Error =>
            {
                if (Error.status === 401)
                {
                    alert(Error);
                    this.layoutService.Unauthorized();
                }
                
            }
        );
    }

}
