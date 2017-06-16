import { Component } from '@angular/core';
const imgprof = './img/default_user.jpg';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'app';

    private RutaFoto = imgprof;// require('./img/default_user.jpg');
}
