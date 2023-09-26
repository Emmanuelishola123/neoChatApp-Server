import { TypeOf, object, string } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),
    confirmPassord: string({
      required_error: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassord, {
    message: "password do not match",
    path: ["comparePassword"],
  }),
};

export type registerUserBody = TypeOf<typeof registerUserSchema.body>;
