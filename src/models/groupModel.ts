import { Ref, prop } from "@typegoose/typegoose";
import { User } from "./userModel";

export class Group {
  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ required: true, ref: () => User })
  public admins: Ref<User>[];

  @prop()
  public avatar?: string;

  @prop({ required: true, ref: () => User })
  public participants: Ref<User>[];

  @prop({ required: true })
  public name: string;

  @prop({ default: 1024, min: 10, max: 2048 })
  public limit: number;

  @prop()
  public description?: string;

  @prop({ required: true })
  public link: string;
}