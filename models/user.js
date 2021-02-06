import { Schema, model } from "mongoose";

const model = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = new model("User", model);
