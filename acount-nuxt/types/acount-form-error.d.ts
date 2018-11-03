export type FormErrorKey = string

export type FormErrorPayload = {
  key: FormErrorKey
  message: string
}
// vuetify <v-text-field> has prop "error-messages"  in format [messages, …]
export type FormError = [string]
export interface FormErrorState {
  [Key: string]: FormError
}
