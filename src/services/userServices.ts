import { UserModel } from "../models/userModel";

export const updateUser = async (queryKey: string) => {
  try {
    const updatedUser = await UserModel.findOne({
      $or: [{ email: queryKey }, { username: queryKey }, { _id: queryKey }],
    });
    return updatedUser
  } catch (error) {
    return null;
  }
};
