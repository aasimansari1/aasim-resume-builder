import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
