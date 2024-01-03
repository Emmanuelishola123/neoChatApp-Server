import { Ref, prop } from "@typegoose/typegoose";
import { User } from "./userModel";

// @pre<User>("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     const hashed = await argon2.hash(this.password);
//     this.password = hashed;
//     return next();
//   }
// })

export enum CHATTYPE {
  TEXT_CHAT = "text-chat",
  VOICE_CHAT = "voice-chat",
  AUDIO_CHAT = "audio-chat",
  VIDEO_CHAT = "video-chat",
  FILE_CHAT = "file-chat",
}

export class Chat {
  @prop({ required: true, ref: () => User })
  public sender: Ref<User>;

  @prop({ required: true, ref: () => User })
  public receiver: Ref<User>;

  @prop({ required: true, enum: CHATTYPE, type: String })
  public type: CHATTYPE;

  @prop({ default: false })
  public editted?: boolean;

  @prop({ type: Boolean, default: false })
  public isReference?: boolean;

  @prop({ ref: () => Chat })
  public referenceTo?: Ref<Chat>;

  @prop({})
  public text?: string;

  @prop({})
  public files?: (Buffer | string)[];

  @prop({})
  public voiceNote?: Buffer | string;
}
