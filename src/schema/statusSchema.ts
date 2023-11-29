import { TypeOf, nativeEnum, number, object, string } from "zod";
import { STATUS_TYPE } from "../models/statusModel";

export const statusSchema = {
  body: object({
    content: string({
      required_error: "Content is required",
    }),
    type: nativeEnum(STATUS_TYPE),
    expireAfter: number({ required_error: "Duration is required" }),
    sender: string().optional(),
  }),
};

export type statusSchemaBody = TypeOf<typeof statusSchema.body>;
