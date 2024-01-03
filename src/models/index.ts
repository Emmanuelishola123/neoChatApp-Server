import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Status } from "./statusModel";
import { Chat } from "./chatModel";
import { Group } from "./groupModel";

// User Model
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

// Status Models
export const StatusModel = getModelForClass(Status, {
  schemaOptions: {
    timestamps: true,
  },
});

// Chat Models
export const ChatModel = getModelForClass(Chat, {
  schemaOptions: {
    timestamps: true,
  },
});
// Group Models
export const GroupModel = getModelForClass(Group, {
  schemaOptions: {
    timestamps: true,
  },
});
