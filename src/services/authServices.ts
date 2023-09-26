import { UserModel } from "../models/userModel";
import { registerUserBody } from "../schema/authSchema";

export const registerNewUser = async (user: Omit<registerUserBody, 'confirmPassword'>) => {
  return await UserModel.create(user);
};
