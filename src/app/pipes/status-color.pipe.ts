import { Pipe, PipeTransform } from '@angular/core';
import {StatusLesson} from "../types/Lesson";

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
color = {
  expected: () => 'yellow',
  completed: () => 'green',
  abandoned: () => 'red',
  canceled: () => 'gray'
}
  transform(value: StatusLesson): unknown {
    return this.color[value]();
  }

}
