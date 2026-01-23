import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "The 'username' field is required"],
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [20, "Username must be at most 20 characters long"],
        },
        password: {
            type: String,
            minlength: [8, "Password must be at least 8 characters long"],
            required: [true, "The 'password' field is required"],
        },
        email: {
            type: String,
            required: [true, "The 'email' field is required"],
            lowercase: true,
            trim: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: "Please provide a valid email address",
            },
        },
        firstName: {
            type: String,
            required: [true, "The 'First name' field is required"],
            trim: true,
            minlength: [2, "First name must be at least 2 characters long"],
            maxlength: [30, "First name must be at most 30 characters long"],
        },
        lastName: {
            type: String,
            required: [true, "The 'Last name' field is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters long"],
            maxlength: [30, "Last name must be at most 30 characters long"],
        },
        jobTitle: {
            type: String,
            required: [true, "The 'Job title' field is required"],
        },
        profilePicture: {   // secure_url
            type: String,
        },
        profilePicturePublicId: {   // cloudinary public_id (so we can delete/replace images later)
            type: String,
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;