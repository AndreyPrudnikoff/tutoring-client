import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../services/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class HeadersService implements HttpInterceptor{

  constructor(private api: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.api.token;
    if(!token) {
      return next.handle(req);
    }
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next.handle(req);
  }
}
