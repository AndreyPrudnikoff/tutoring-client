import { Injectable } from '@angular/core';
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  lessons = [];
  user: User;
  constructor() { }
}
