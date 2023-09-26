import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { registerUserBody } from "../schema/authSchema";
import { registerNewUser } from "../services/authServices";

class authControllers {
  /**
   * Register new user
   *
   * @param req
   * @param res
   */
  static registerUser = async (
    req: Request<{}, {}, registerUserBody>,
    res: Response,
  ) => {
    const { username, email, password } = req.body;

    try {
      await registerNewUser({ username, email, password });

      return sendResponse(res, httpStatus.CREATED, "User successfully created");
    } catch (error) {
    //   if (error.code === 11000) {
    //     return sendResponse(res, httpStatus.CONFLICT, "User already exist");
    //   }
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error creating user",
      );
    }
  };

  /**
   * Login user to Account
   *
   * @param req
   * @param res
   */
  static loginUser = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
}

export default authControllers;
