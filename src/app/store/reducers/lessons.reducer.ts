import {Action, createReducer, on} from "@ngrx/store";
import {getLessonsActionFailure, getLessonsActionSuccess} from "../actions/lessons.action";

const initialState = {
  lessons: null,
  error: null
}

const lessonsReducer = createReducer(
  initialState,
  on(
    getLessonsActionSuccess,
    (state, action) => ({
      ...state,
      lessons: action.lessons
    })
  ),
  on(
    getLessonsActionFailure,
    (state) => ({
      ...state,
      error: 'Getting lessons finished with error'
    })
  )
)

export function lessonsReducers(state: any, action: Action) {
  return lessonsReducer(state, action);
}
