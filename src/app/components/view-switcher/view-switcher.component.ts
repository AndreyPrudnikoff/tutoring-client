import { Component, OnInit } from '@angular/core';
import { CalendarService } from "../../services/calendar.service";

type SwitchNavigation = 'prev' | 'current' | 'next';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss']
})
export class ViewSwitcherComponent implements OnInit {

  constructor(public calendar: CalendarService) {
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
        this.calendar.viewDate.next(new Date(time.year, time.month, time.date));
        break;
      case "next":
        this.calendar.viewDate
          .next(new Date(
            this.calendar.viewDate.value.getMonth() < 11
              ? this.calendar.viewDate.value.getFullYear()
            : this.calendar.viewDate.value.getFullYear() + 1,
            this.calendar.viewDate.value.getMonth() < 11 ? this.calendar.viewDate.value.getMonth() + 1 : 0,
            this.calendar.viewDate.value.getDate())
          );
        break;
      case "prev":
        this.calendar.viewDate
          .next(
            new Date(new Date(
              this.calendar.viewDate.value.getMonth() === 0
                ? this.calendar.viewDate.value.getFullYear() - 1
                : this.calendar.viewDate.value.getFullYear(),
              this.calendar.viewDate.value.getMonth() > 0 ? this.calendar.viewDate.value.getMonth() - 1 : 11,
              this.calendar.viewDate.value.getDate())));
        break;
      default:
        this.calendar.viewDate.next(new Date(Date.now()));
        break;
    }
  }
}

