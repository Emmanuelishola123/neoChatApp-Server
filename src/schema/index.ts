// User Schema
export { fetchProfileParamsType, fetchProfileSchema } from "./userSchema";



//
export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
}

export interface IServiceProp<T> {
  error: boolean;
  message: string;
  statusCode: number;
  data?: T;
}
