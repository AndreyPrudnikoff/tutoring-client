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
import {NgbModalModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import { DayOfMonthComponent } from './components/day-of-month/day-of-month.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {lessonsReducers} from "./store/reducers/lessons.reducer";
import {LessonsEffects} from "./store/effects/lessons.effects";
import { MonthComponent } from './pages/schedule-page/components/month/month.component';
import { WeekComponent } from './pages/schedule-page/components/week/week.component';
import { DayComponent } from './pages/schedule-page/components/day/day.component';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import {ErrorService} from "./interceptors/error.service";


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
    NgbTooltipModule,
    StoreModule.forRoot({schedule: lessonsReducers}),
    EffectsModule.forRoot([LessonsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  declarations: [
    AppComponent,
    StartPageComponent,
    SchedulePageComponent,
    DayOfMonthComponent,
    ViewSwitcherComponent,
    MonthComponent,
    WeekComponent,
    DayComponent,
    StatusColorPipe,
    ModalErrorComponent,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
