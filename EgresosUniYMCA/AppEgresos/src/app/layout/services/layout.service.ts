import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Router } from '@angular/router';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class LayoutService extends BaseService {

    constructor(private http: Http, public router: Router) {
     super();
  }
 

  setHeaders(): Headers{

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');

      if (authToken !== '') {
          let tokenValue = 'Bearer ' + authToken;
          headers.append('Authorization', tokenValue);
      }
      return headers;
  }

  Unauthorized()
  {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/login']);
  }

}

