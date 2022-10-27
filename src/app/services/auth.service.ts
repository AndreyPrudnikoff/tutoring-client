import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  constructor(public http: HttpClient) {
    super();
  }

  register(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, body)
  }
  login( body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, body)
  }

}
