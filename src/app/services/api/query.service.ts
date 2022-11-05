import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService{

  constructor(private http: HttpClient) {
    super();
  }

  getLessons(key: string, condition: string, value: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/lessons/${key}/${condition}/${value}`)
  }
  createLesson(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/lessons`, body)
  }
}
