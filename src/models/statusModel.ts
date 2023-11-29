import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import User from "./userModel";
import { extendTime } from "../utils";

export enum STATUS_TYPE {
  TEXT = "text",
  VOICE = "voice",
  VIDEO = "video",
  IMAGE = "image",
}

class Status {
  @prop({ required: true, ref: () => User })
  public sender: Ref<User>;

  @prop({ required: true, enum: STATUS_TYPE, type: String })
  public type: STATUS_TYPE;

  @prop({ default: true })
  public content: string | Buffer;

  @prop({ required: true, default: extendTime(24, "hours") })
  public expireAfter: Date;

  @prop({ default: false })
  public achieved: boolean;
}

export default Status;

export const StatusModel = getModelForClass(Status, {
  schemaOptions: {
    timestamps: true,
  },
});
