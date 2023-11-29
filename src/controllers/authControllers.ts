import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import {
  forgotPasswordBodyParams,
  loginUserBodyParams,
  registerUserBodyParams,
  resetPasswordBodyParams,
  resetPasswordQueryParams,
} from "../schema/authSchema";
import { loginUser, registerNewUser } from "../services/authServices";
import { signJWT } from "../utils/jwt";
// import config from "../config";
import { UserModel } from "../models/userModel";
import { extendTime } from "../utils";
import { generateToken } from "../utils";
import { sendEmail } from "../services/emailServices";
import { omit } from "../utils/helpers";

class authControllers {
  /**
   * Register new user
   *
   * @param req
   * @param res
   */
  static registerUser = async (
    req: Request<object, object, registerUserBodyParams>,
    res: Response,
  ) => {
    const { name, email, password } = req.body;

    try {
      const newUser = await registerNewUser({
        name,
        username: email.split("@")[0],
        usernameUpdatedAt: new Date(),
        email,
        password,
        passwordUpdatedAt: new Date(),
      });

      const payload = {
        _id: newUser._id,
      };

      // Sign token with user id : _id
      const token = signJWT(payload);
      console.log({ token });

      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        domain: "*",
        // domain: config.BASE_URL,
        // path: "/",
        // sameSite: "strict",
      });

      // const data = omit(newUser, ["__v", "password"]);

      const newUserData = omit(newUser, [
        "password",
        "resetToken",
        "resetTokenTTL",
        "__v",
      ]);

      return sendResponse(
        res,
        httpStatus.CREATED,
        "User successfully created",
        newUserData,
      );
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
  static loginUser = async (
    req: Request<object, object, loginUserBodyParams>,
    res: Response,
  ) => {
    try {
      // Sign in User Function
      const user = await loginUser({ ...req.body });
      // Check if user exists
      if (!user) {
        return sendResponse(
          res,
          httpStatus.NOT_FOUND,
          "No user found",
          {},
          true,
        );
      }
      // check if there is error
      if (!(await user.comparePassword(req.body.password))) {
        return sendResponse(
          res,
          httpStatus.FORBIDDEN,
          "Incorrect password",
          {},
          true,
        );
      }

      const payload = {
        _id: user._id,
      };

      // Sign token with user id : _id
      const token = signJWT(payload);
      console.log({ token });

      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        domain: "*",
        // domain: config.BASE_URL,
        // path: "/",
        // sameSite: "strict",
      });

      // const data = omit(user, ["__v", "password"]);

      return sendResponse(
        res,
        httpStatus.OK,
        "Successfully Authenticated",
        user,
      );
    } catch (error) {
      console.log({ error });
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        {},
        true,
      );
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static forgotPassword = async (
    req: Request<object, object, forgotPasswordBodyParams>,
    res: Response,
  ) => {
    const { email } = req.body;
    try {
      const newToken = await generateToken();

      await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            resetToken: newToken,
            resetTokenTTL: extendTime(10, "minutes"),
          },
        },
      );

      // Send Reset token to user
      await sendEmail(
        email,
        {
          link: newToken,
          name: email.split("@")[0],
          title: "Password Reset Link",
        },
        "forgotpassword",
        "Password Reset Link",
      );

      return sendResponse(
        res,
        httpStatus.OK,
        "Forgot Password instructions has been sent to your email",
      );
    } catch (error) {
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        {},
        true,
      );
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static resetPassword = async (
    req: Request<
      object,
      object,
      resetPasswordBodyParams,
      resetPasswordQueryParams
    >,
    res: Response,
  ) => {
    const { confirmPassword, password } = req.body;
    const { token } = req.query;
    try {
      if (password !== confirmPassword) {
        return sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          "Password and confirm password must match.",
          {},
          true,
        );
      }

      await UserModel.findOneAndUpdate(
        { resetToken: token },
        {
          $set: {
            password: password,
            resetToken: null,
            resetTokenTTL: null,
          },
        },
      );

      return sendResponse(res, httpStatus.OK, "Password successfully changed!");
    } catch (error) {
      console.log({error})
      return sendResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        {},
        true,
      );
    }
  };
}

export default authControllers;
