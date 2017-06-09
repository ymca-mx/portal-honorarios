import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    Nombre;
    constructor(private http: Http) { }

    GetNombre() {
        window.console.log("Estoy Adentro");
        this.Nombre =
            this.http
            .get('api/value')
            .subscribe(res=> res.json());
    }
}
