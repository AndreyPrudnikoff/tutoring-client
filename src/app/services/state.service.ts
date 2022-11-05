import { Injectable } from '@angular/core';
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  lessons = [];
  user: User | null = JSON.parse(sessionStorage.getItem('user')) || null;
  user_role: string = sessionStorage.getItem('user_role') || ''
  constructor() { }
}
