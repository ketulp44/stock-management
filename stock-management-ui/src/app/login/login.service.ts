import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL: string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  Login(userDetails) {
    return this.http.post(`${BASE_URL}account/login`, userDetails);
  }
}
