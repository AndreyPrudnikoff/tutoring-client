import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import {Observable} from "rxjs"

type Method = 'login' | 'register'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {

  }

  operation(method: Method, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${method}`, body)
  }
}
