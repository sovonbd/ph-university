import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bycrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["admin", "student", "faculty"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// middleware - pre
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bycrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

// middleware - post
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
