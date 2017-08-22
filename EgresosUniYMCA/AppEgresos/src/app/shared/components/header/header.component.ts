import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions} from '@angular/http';
import { LayoutService } from '../../../layout/services/layout.service'; 

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public headers = this.layoutService.setHeaders();
    public options = new RequestOptions({ headers: this.headers });
    user: string = "";
    constructor(private http: Http, private layoutService: LayoutService) {
       
        this.http
            .get('api/Account/usuario', this.options).subscribe(
            result => {
                let data = result.json();
                this.user = data.nombre;
            }
            );

    }

    ngOnInit()
    {
    }
    
    onLoggedout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    
}
