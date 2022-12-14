import {Injectable} from '@angular/core';
import {Hour, Lesson} from "../types/Lesson";
import {BehaviorSubject} from "rxjs";
import {StateService} from "./state.service";
import {QueryService} from "./api/query.service";
import {Store, select} from "@ngrx/store";
import {selectLessons} from "../store/selectors/lessons.selector";
import {getLessonsAction} from "../store/actions/lessons.action";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  options: any = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
  locale = window.navigator.language;
  viewDate = new BehaviorSubject(new Date(this.getClearDateNow()));
  currentDate = new Date(Date.now()).getDate();
  currentMonth = this.viewDate.value.getMonth();
  currentYear = this.viewDate.value.getFullYear();
  currentMonthDays = new Array(this.daysInMonth(this.currentMonth, this.currentYear)).fill(0);

  constructor(private state: StateService, private query: QueryService, private store: Store) {
    this.store.pipe(select(selectLessons))
      .subscribe(lessons => {
        if (lessons) {
          this.state.lessons = lessons;
          this.state.lessonsRender = this.monthWithLessons(this.currentMonthDays, this.state.lessons);
        }
      })
    this.viewDate.subscribe((value) => {
      this.currentDate = value.getDate();
      this.currentMonth = value.getMonth();
      this.currentYear = value.getFullYear();
      this.currentMonthDays = new Array(this.daysInMonth(this.currentMonth, this.currentYear)).fill(0);
      this.store.dispatch(getLessonsAction());
    })
  }

  getLessons() {
    return this.query.getLessons({
      user_id: this.state.user.user_id,
      role: this.state.user_role,
      time_range: {
        more: `${this.currentYear}-${this.currentMonth + 1}-01`,
        less: `${this.currentYear}-${this.currentMonth + 1}-${this.currentMonthDays.length}`
      }
    })
  }

  daysInMonth(month: number, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDay() {
    return new Date(this.currentYear, this.currentMonth, 1).getDay();
  }

  getLastDay() {
    return new Date(this.currentYear, this.currentMonth, this.currentMonthDays.length).getDay();
  }

  monthWithLessons(currentMonthDays: any[], lessons: Lesson[]) {
    const merge = (el, index) => {
      const date: any = {date: this.viewDate.value.setDate(index + 1), lesson: []}
      lessons.forEach(lesson => {
        const lessonDate = new Date(lesson.start_time).getDate()
        if (new Date(date.date).getDate() === lessonDate) {
          date.lesson.push(lesson);
        }
      })
      return date;
    }
    const begin = () => {
      const data = this.getFirstDay() - 1 >= 0 ? this.getFirstDay() - 1 : 0;
      return new Array(data);
    }
    const finish = () => this.getLastDay() ? new Array(7 - this.getLastDay()) : []
    return [...begin(), ...this.currentMonthDays.map(merge), ...finish()].map((el) => {
      if (!el) {
        return {date: '', lessons: []}
      } else {
        return el
      }
    })
  }

  getHours(day: any): Hour[] {
    const hours = []
    for (let i = 0; i < 24; i++) {
      const startHour = new Date(new Date(day.date).setHours(i)).setMinutes(0);
      const endHour = new Date(new Date(startHour).setHours(i + 1)).setMinutes(0);
      const hour = {hour: startHour, lessons: []};
      day.lesson.forEach((lesson: Lesson) => {
        const start = new Date(lesson.start_time).getTime();
        const end = new Date(lesson.end_time).getTime();
        if ((start >= startHour && start < endHour)
          || (end > startHour && end <= endHour)
          || (start < startHour && end > endHour)) {
          hour.lessons.push(lesson);
        }
      })
      hours.push(hour)
    }

    return hours;
  }

  getClearDateNow() {
    return new Date(new Date(new Date(Date.now()).setHours(0)).setMinutes(0)).setMilliseconds(0)
  }

  getCurrentDay(date = this.getClearDateNow()) {
    const day = this.state.lessonsRender.find(lesson => new Date(date).getDate() === new Date(lesson.date).getDate())
    day.hours = this.getHours(day)
    return day;
  }
}
