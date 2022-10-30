import {Component} from '@angular/core';
import {QueryService} from "../../services/query.service";
import {StateService} from "../../services/state.service";


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})

export class SchedulePageComponent {

  constructor(private query: QueryService, public state: StateService) {

  }

  getLessons() {
    this.query.getLessons(this.state.user.user_role + '_id',
      '=',
      this.state.user.user_id,
    ).subscribe(lessons => this.state.lessons = lessons.data)
  }

  createLessons() {
    const lesson = {
      start_time: '2022-11-11 16:00:00',
      end_time: '2022-11-11 17:00:00',
      status_lesson: 'expected',
      comment: 'whohoho',
      tutor_id: 'ccc16cdb-b074-4b4d-86ed-9b88fdec4f4b',
      student_id: this.state.user.user_id,
    }
    this.query.createLesson(lesson)
      .subscribe(response => {
        if (response.success) {
          this.getLessons();
        }
      })
  }
}

