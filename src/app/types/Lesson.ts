export type Lesson = {
  lesson_id: string
  start_time: string
  end_time: string
  status_lesson: StatusLesson
  subject_id: string
  student_id: string
  tutor_id: string
  comment: string
}
export type Hour = {
  hour: number
  lessons: Lesson[]
}
export type RenderLesson = {
  date: number
  hours: Hour[]
  lesson: Lesson[]
}
export type StatusLesson = 'expected' | 'completed' | 'abandoned' | 'canceled'
