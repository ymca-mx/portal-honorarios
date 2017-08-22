import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class UserService extends BaseService {


  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  private ruta = "http://localhost:6795";

  constructor(private http: Http) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
  }

    register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("/api/accounts", body, options)
      .map(res => true)
      .catch(this.handleError);
  }  

   login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let data = "grant_type=password&username=" + username + "&password=" + password;

    return this.http
        .post(this.ruta + '/connect/token',
         data,{ headers }
      )
      .map(res => res.json())
      .map(res => {
          localStorage.setItem('auth_token', res.access_token);
          //localStorage.setItem('user', res.user);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);

        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }  
}

export interface UserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    location: string;
}