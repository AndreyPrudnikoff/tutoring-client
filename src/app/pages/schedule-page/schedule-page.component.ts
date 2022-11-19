import {Component} from '@angular/core';
import {StateService} from "../../services/state.service";
import {CalendarService} from "../../services/calendar.service";
import {formatDate} from "@angular/common";
import {Store} from "@ngrx/store";
import {getLessonsAction} from "../../store/actions/lessons.action";


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})

export class SchedulePageComponent {

  constructor(
    public state: StateService,
    private store: Store,
    public calendar: CalendarService) {
    this.getLessons();
  }

  getLessons() {
    this.store.dispatch(getLessonsAction());
    // this.calendar.getLessons().subscribe(
    //   lessons => {
    //     this.state.lessons = lessons.data;
    //     this.state.lessonsRender = this.calendar.monthWithLessons(this.calendar.currentMonthDays, this.state.lessons);
    //   })
  }

  // createLessons() {
  //   const lesson = {
  //     start_time: '2022-11-11 11:00:00',
  //     end_time: '2022-11-11 12:00:00',
  //     status_lesson: 'expected',
  //     comment: 'Whahaha',
  //     subject_id: 'a1accafe-5d32-11ed-9b6a-0242ac120002',
  //     tutor_id: '51da6ca0-0768-4070-875e-6593ed448bb6',
  //     student_id: '600607f4-7bf9-4802-b284-c203dd8eb389'
  //
  //   }
  //   this.query.createLesson(lesson)
  //     .subscribe(response => {
  //       if (response.success) {
  //         this.getLessons();
  //       }
  //     })
  // }

  isCurrentDay({date}) {
    if (date) {
      const dateSchedule = formatDate(date, 'yyyy-MM-dd', 'en_US');
      const dateNow = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US');
      return dateSchedule === dateNow;
    }
    return false;
  }
}

