import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../types/actionTypes";

export const getLessonsAction = createAction(ActionTypes.GET_LESSONS)
export const getLessonsActionSuccess = createAction(ActionTypes.GET_LESSONS_SUCCESS, props<{lessons: any}>())
export const getLessonsActionFailure = createAction(ActionTypes.GET_LESSONS_FAILURE)
