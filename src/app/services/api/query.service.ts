import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {QueryLessons} from "../../types/api";

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService{

  constructor(private http: HttpClient) {
    super();
  }

  getLessons(data: QueryLessons): Observable<any> {
    return this.http.post(`${this.baseUrl}/lessons`, {method: 'get', data})
  }
  createLesson(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/lessons`, {method: 'create', data})
  }
}
