import { TypeOf, object, string } from "zod";

export const registerUserSchema = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password can not exceed 64 characters"),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["comparePassword"],
  }),
};

export const loginUserSchema = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password can not exceed 64 characters"),
  }),
};

export type registerUserBody = TypeOf<typeof registerUserSchema.body>;
export type loginUserBody = TypeOf<typeof loginUserSchema.body>;

