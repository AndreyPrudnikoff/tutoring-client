import {Injectable} from '@angular/core';
import {StateService} from "./state.service";
import {Lesson} from "../types/Lesson";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  options: any = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
  locale = window.navigator.language;
  dateNow = new Date(Date.now());
  currentDate = this.dateNow.getDate();
  currentMonth = this.dateNow.getMonth();
  currentYear = this.dateNow.getFullYear();
  currentMonthDays = new Array(this.daysInMonth(this.currentMonth, this.currentYear)).fill(0);

  constructor() {
    console.log()
  }

  daysInMonth(month: number, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  monthWithLessons(currentMonthDays: any[], lessons: Lesson[]) {
    return this.currentMonthDays.map((el, index) => {
      const date: any = {date: index + 1, lesson: []}
      lessons.forEach(lesson => {
        const lessonDate = new Date(lesson.start_time).getDate()
        if (date.date === lessonDate) {
          date.lesson.push(lesson);
        }
      })
      return date;
    })
  }
}
