import { StatusModel } from "../models";
import { Status } from "../models/statusModel";

/*
 * Register new user to db
 *
 * @param user : registerUserBodyParams
 * @returns userSchema
 */
export const createNewStatus = async (status: Status) => {
  return await StatusModel.create(status);
};
