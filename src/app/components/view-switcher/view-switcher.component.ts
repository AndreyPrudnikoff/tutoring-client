import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";

type SwitchNavigation = 'prev' | 'current' | 'next';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss']
})
export class ViewSwitcherComponent implements OnInit {

  constructor(private calendar: CalendarService) {
  }

  ngOnInit(): void {
  }

  setMonth(value: SwitchNavigation) {
    const time = {
      year: new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth(),
      date: new Date(Date.now()).getDate()
    }
    switch (value) {
      case "current":
        this.calendar.dateNow.next(new Date(time.year, time.month, time.date));
        break
      case "next":
        time.month++;
        this.calendar.dateNow.next(new Date(time.year, time.month, time.date));
        break
      case "prev":
        time.month--;
        this.calendar.dateNow.next(new Date(new Date(time.year, time.month, time.date)));
        break
      default:
        this.calendar.dateNow.next(new Date(Date.now()));
        break;
    }
  }
}
