import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";

const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'schedule', component: SchedulePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
