import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../../services/state.service";
import {Store} from "@ngrx/store";
import {CalendarService} from "../../../../services/calendar.service";
import {getLessonsAction} from "../../../../store/actions/lessons.action";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  constructor(
    public state: StateService,
    private store: Store,
    private router: Router,
    public calendar: CalendarService) {
    this.getLessons();
  }

  getLessons() {
    this.store.dispatch(getLessonsAction());
  }


  isCurrentDay({date}) {
    if (date) {
      const dateSchedule = formatDate(date, 'yyyy-MM-dd', 'en_US');
      const dateNow = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US');
      return dateSchedule === dateNow;
    }
    return false;
  }
  async toDay(day) {
    if (day.date) {
     await this.router.navigate(['schedule/day'], {state: this.calendar.getCurrentDay(day.date)})
    }
  }
  ngOnInit(): void {
  }

}
