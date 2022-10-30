import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StartPageComponent} from './pages/start-page/start-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeadersService} from "./interceptors/headers.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {SpinnerService} from "./interceptors/spinner.service";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    StartPageComponent,
    SchedulePageComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
