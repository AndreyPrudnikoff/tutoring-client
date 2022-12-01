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
    switch (value) {
      case "current":
        this.calendar.viewDate.next(new Date(this.calendar.getClearDateNow()));
        break;
      case "next":
        this.calendar.viewDate
          .next(new Date(
            this.calendar.viewDate.value.getMonth() < 11
              ? this.calendar.viewDate.value.getFullYear()
            : this.calendar.viewDate.value.getFullYear() + 1,
            this.calendar.viewDate.value.getMonth() < 11 ? this.calendar.viewDate.value.getMonth() + 1 : 0,
            1)
          );
        break;
      case "prev":
        this.calendar.viewDate
          .next(new Date(new Date(
            this.calendar.viewDate.value.getMonth() === 0
              ? this.calendar.viewDate.value.getFullYear() - 1
              : this.calendar.viewDate.value.getFullYear(),
            this.calendar.viewDate.value.getMonth() > 0 ? this.calendar.viewDate.value.getMonth() - 1 : 11,
            1)));
        break;
      default:
        this.calendar.viewDate.next(new Date(this.calendar.getClearDateNow()));
        break;
    }
  }
}

