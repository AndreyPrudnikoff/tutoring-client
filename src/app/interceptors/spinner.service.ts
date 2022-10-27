import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements HttpInterceptor {

  count = 0;

  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    this.spinner.show();
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.count--;
          if (this.count === 0) {
            this.spinner.hide();
          }
        })
      );
  }
}
