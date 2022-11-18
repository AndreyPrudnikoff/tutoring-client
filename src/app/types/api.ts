export type LoginResponse = {
  success: boolean
  token?: string
  data?: any
  message?: string
}
export type QueryLessons = {
  user_id: string
  role: string
  time_range?: {
    less?: string
    more?: string
  }
  status?: string
}
export type LessonRequestBody = {
  method: string
  data: QueryLessons
}
