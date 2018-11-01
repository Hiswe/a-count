export interface NotificationPayload {
  type: `success` | `info` | `warn` | `error`
  message: string
}
export interface Notification extends NotificationPayload {
  id: string
}
export interface NotificationState {
  list: Notification[]
}
