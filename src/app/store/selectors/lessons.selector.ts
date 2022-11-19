import {createSelector} from "@ngrx/store";

const selectSchedule = state => state.schedule;

export const selectLessons = createSelector(selectSchedule, state => state.lessons);
