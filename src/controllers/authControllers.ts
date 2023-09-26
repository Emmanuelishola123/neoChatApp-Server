import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { loginUserBody, registerUserBody } from "../schema/authSchema";
import { findUserByEmail, registerNewUser } from "../services/authServices";
import { signJWT } from "../utils/jwt";
import config from "../config";
import { omit } from "../utils/helpers";

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
    const { name, username, email, password } = req.body;

    try {
      await registerNewUser({ name, username, email, password });

      return sendResponse(res, httpStatus.CREATED, "User successfully created");
    } catch (error) {
      //   if (error.code === 11000) {
      //     return sendResponse(res, httpStatus.CONFLICT, "User already exist");
      //   }
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error creating user: " + error,
      );
    }
  };

  /**
   * Login user to Account
   *
   * @param req
   * @param res
   */
  static loginUser = async (req: Request<{}, {}, loginUserBody>, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);

      if (!user || !user.comparePassword(password)) {
        return sendResponse(
          res,
          httpStatus.UNAUTHORIZED,
          "Invalid email or password",
          {},
          true,
        );
      }

      const payload = omit(user.toJSON(), ["password"]);

      const jwt = signJWT(payload);

      res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, // 1 yr
        httpOnly: true,
        domain: config.BASE_URL,
        path: "/",
        sameSite: "strict",
      });

      sendResponse(res, httpStatus.OK, "Login successful", {});
    } catch (error) {
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error signing in user: " + error,
      );
    }
  };
}

export default authControllers;
