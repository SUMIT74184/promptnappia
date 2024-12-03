import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
    match: [/.+@.+\..+/, "Invalid email format"], // Optional: Validate email format
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true, // Ensures username uniqueness
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid: it should be 8-20 alphanumeric characters and unique!",
    ],
  },
  image: {
    type: String,
    default: "", // Optional: Provide a default value for image
  },
});

// Ensure the model is created only once (avoids overwriting during hot reloads)
const User = models.User || model("User", UserSchema);

export default User;
