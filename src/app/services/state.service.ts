import {Injectable} from '@angular/core';
import {User} from "../types/User";
import {Lesson} from "../types/Lesson";
import vocabulary from '../locales/daysOfWeek'
@Injectable({
  providedIn: 'root'
})
export class StateService {

  lessons: Lesson[] = [];
  lessonsRender: any[];
  user: User | null = JSON.parse(sessionStorage.getItem('user')) || null;
  user_role: string = sessionStorage.getItem('user_role') || ''
  locale = 'ua'
  days = vocabulary[this.locale];

  constructor() {
  }
}
