import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {
http.get()
  }
  basicOperation(method: Method, url: string) {
    return this.http[method](`${this.baseUrl}/${url}`)
  }
}
