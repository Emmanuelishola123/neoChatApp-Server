import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    await argon2.hash(this.password);
    return next();
  }
})
class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public username: string;

  @prop()
  public avatar?: string;

  @prop()
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
