import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {getLessonsAction, getLessonsActionFailure, getLessonsActionSuccess} from "../actions/lessons.action";
import {CalendarService} from "../../services/calendar.service";

@Injectable()
export class LessonsEffects {
  constructor(private actions: Actions, private calendar: CalendarService) {
  }

  lessons = createEffect(() => this.actions.pipe(
    ofType(getLessonsAction),
    switchMap(() => this.calendar.getLessons().pipe(
      map((response: any) => getLessonsActionSuccess({lessons: response.data})),
      catchError(() => of(getLessonsActionFailure()))
    ))
  ));
}
