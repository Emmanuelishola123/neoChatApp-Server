import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { statusSchemaBody } from "../schema/statusSchema";
import { createNewStatus } from "../services/statusServices";
import mongoose from "mongoose";
import { extendTime } from "../utils";

class statusControllers {
  /**
   * Login user to Account
   *
   * @param req
   * @param res
   */
  static createStatus = async (
    req: Request<object, object, statusSchemaBody>,
    res: Response,
  ) => {
    const { content, expireAfter, type, sender } = req.body;

    try {
      const userId = new mongoose.Types.ObjectId(sender);

      await createNewStatus({
        content,
        expireAfter: extendTime(expireAfter, "hours"),
        type,
        sender: userId,
        achieved: false,
      });

      return sendResponse(res, httpStatus.OK, "Successfully posted status");
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
}

export default statusControllers;
