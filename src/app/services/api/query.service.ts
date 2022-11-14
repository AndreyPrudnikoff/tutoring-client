import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { LessonRequestBody } from "../../types/api";

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService{

  constructor(private http: HttpClient) {
    super();
  }

  getLessons({method = 'get', data}: LessonRequestBody): Observable<any> {
    return this.http.post('${this.baseUrl}/lessons/', {method, data})
  }
  createLesson({method = 'create', data}: LessonRequestBody): Observable<any> {
    return this.http.post('${this.baseUrl}/lessons', {method, data})
  }
}
