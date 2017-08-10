import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class LayoutService extends BaseService {

  constructor(private http: Http) {
     super();
  }

  getHomeDetails(): Observable<HomeDetails> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
  
    return this.http.get("api/dashboard/home",{headers})
      .map(response => response.json())
      .catch(this.handleError);
  }  
}


export interface HomeDetails {
    message: string;
}