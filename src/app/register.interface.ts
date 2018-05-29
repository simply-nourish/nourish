import { RegisterData } from "angular2-token";

//register.interface.ts
// this should always match the API POST /auth
// defaultServings must be converted to a number within the API

export interface RegisterUser extends RegisterData {
  nickname: string,
  firstName: string,
  lastName: string,
  defaultServings: string, 
  image: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  confirmSuccessUrl: string
}