import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from 'rxjs';
import {BehaviorService} from "../services/behavior.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor {

  constructor(private behavior: BehaviorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        this.behavior.openModal(err.error, 3000);
        return err;
      }));
  }
}
