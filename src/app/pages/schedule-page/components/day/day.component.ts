import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectLessons} from "../../../../store/selectors/lessons.selector";
import {CalendarService} from "../../../../services/calendar.service";
import {getLessonsAction} from "../../../../store/actions/lessons.action";


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  day: any;

  constructor(private router: Router, private store: Store, private calendar: CalendarService) {
    this.day = this.router.getCurrentNavigation().extras.state;
    this.day && console.log(this.day)
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


}
