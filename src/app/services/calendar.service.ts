import {Injectable} from '@angular/core';
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
      const date: any = {date: index + 1, lesson: []}
      lessons.forEach(lesson => {
        const lessonDate = new Date(lesson.start_time).getDate()
        if (date.date === lessonDate) {
          date.lesson.push(lesson);
        }
      })
      return date;
    }
    const begin = () => new Array(this.getFirstDay() - 1)
    const finish = () => this.getLastDay() ? new Array(7 - this.getLastDay()) : []
    return [...begin(), ...this.currentMonthDays.map(merge), ...finish()].map((el) => {
      if (!el) {
        return {date: '', lessons: []}
      } else {
        return el
      }
    })
  }
}
