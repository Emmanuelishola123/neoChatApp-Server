import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hashed = await argon2.hash(this.password);
    this.password = hashed;
    return next();
  }
})
class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ unique: true })
  public username?: string;

  @prop({ required: true })
  public usernameUpdatedAt: Date;

  @prop()
  public avatar?: Buffer | string;

  @prop()
  public password: string;

  @prop()
  public passwordUpdatedAt: Date;

  @prop()
  public resetToken?: string;

  @prop()
  public resetTokenTTL?: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export default User

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
