import User, { UserModel } from "../models/userModel";
import {
  loginUserBodyParams,
  // registerUserBodyParams,
} from "../schema/authSchema";

// interface newUser extends registerUserBodyParams {
//   usernameUpdateAt: Date;
//   passwordUpdateAt?: Date;
// }

/**
 * Register new user to db
 *
 * @param user : registerUserBodyParams
 * @returns userSchema
 */
export const registerNewUser = async (
  user: Omit<User, 'comparePassword'>
) => {
  return await UserModel.create(user);
};

/**
 *
 * @param userCredential : loginUserBodyParams
 * @returns userSchema
 */
export const loginUser = async (userCredential: loginUserBodyParams) => {
  const existingUser = await UserModel.findOne({
    $or: [
      { email: userCredential.emailOrUsername },
      { username: userCredential.emailOrUsername },
    ],
  });

  if (!existingUser) {
    return null;
  }

  return existingUser;
};



