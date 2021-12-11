import { model, Document, Schema } from "mongoose";

export interface IUser {
  _id?: string;

  // Auth
  email: string;
  password: string;
  salt: string;
  jwtVersion: number;

  // Meta
  firstName: string;
  lastName: string;

  // Virtuals
  name: string;
}

export interface IUserDocument extends IUser, Document<string> {}

const userSchema = new Schema<IUserDocument>(
  {
    // Auth
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    jwtVersion: { type: Number, default: 0 },

    // Meta
    firstName: { type: String },
    lastName: { type: String },
  },
  { 
    timestamps: true
  },
);

userSchema.virtual("name").get(function (this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUserDocument>("user", userSchema);
