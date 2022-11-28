import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectLessons} from "../../../../store/selectors/lessons.selector";
import {CalendarService} from "../../../../services/calendar.service";
import {getLessonsAction} from "../../../../store/actions/lessons.action";
import {Lesson, RenderLesson} from "../../../../types/Lesson";


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  day: RenderLesson;

  constructor(private router: Router, private store: Store, private calendar: CalendarService) {
    this.day = this.router.getCurrentNavigation().extras.state as RenderLesson;
    this.day && console.log(this.day, 1)
    if (!this.day) {
      store.dispatch(getLessonsAction());
      store.pipe(select(selectLessons))
        .subscribe(lessons => {
          if (lessons) {
            this.day = this.calendar.getCurrentDay();
            console.log(this.day)
          }
        })
    }
  }

  computeBackground(lesson: Lesson, hour: number) {
    const start = new Date(lesson.start_time).getTime();
    const end = new Date(lesson.end_time).getTime();
    const dif = end - start;
    const startHour = hour;
    const endHour = new Date(startHour).setHours(new Date(startHour).getHours() + 1);
    if (startHour <= start && endHour >= start && endHour <= end || startHour >= start && endHour <= end && startHour <= end) {
      return dif / 3600000 * 100;
    }
    return 0;
  }
}
