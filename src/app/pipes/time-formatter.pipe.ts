import { Pipe, PipeTransform } from '@angular/core';
import {CalendarService} from "../services/calendar.service";

@Pipe({
  name: 'time'
})
export class TimeFormatterPipe implements PipeTransform {

  constructor(private calendar: CalendarService) {
  }
  transform(date: any): string {
    const time = new Date(date)
    return new Intl.DateTimeFormat(this.calendar.locale, this.calendar.options).format(time)
  }

}
