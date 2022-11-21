import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";
import {MonthComponent} from "./pages/schedule-page/components/month/month.component";
import {WeekComponent} from "./pages/schedule-page/components/week/week.component";
import {DayComponent} from "./pages/schedule-page/components/day/day.component";

const scheduleRoutes: Routes = [
  {
    path: '',
    redirectTo: 'month',
    pathMatch: 'full'
  },
  {
    path: 'month',
    component: MonthComponent
  },
  {
    path: 'week',
    component: WeekComponent
  },
  {
    path: 'day',
    component: DayComponent
  }
];

const routes: Routes = [
  {path: '', component: StartPageComponent},
  {
    path: 'schedule',
    component: SchedulePageComponent,
    children: scheduleRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
