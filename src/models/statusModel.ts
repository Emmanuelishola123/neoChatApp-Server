import { Ref, prop } from "@typegoose/typegoose";
import { extendTime } from "../utils";
import { User } from "./userModel";

export enum STATUS_TYPE {
  TEXT = "text",
  VOICE = "voice",
  VIDEO = "video",
  IMAGE = "image",
}

export class Status {
  @prop({ ref: () => User })
  public sender: Ref<User>;

  @prop({ required: true, enum: STATUS_TYPE, type: String })
  public type: STATUS_TYPE;

  @prop({ default: true })
  public content: string;

  @prop({ required: true, default: extendTime(24, "hours") })
  public expireAfter: Date;

  @prop({ default: false })
  public achieved: boolean;
}
