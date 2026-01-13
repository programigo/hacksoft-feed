import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "The 'username' field is required"],
        },
        password: {
            type: String,
            required: [true, "The 'password' field is required"],
        },
        email: {
            type: String,
            required: [true, "The 'email' field is required"],
        },
        firstName: {
            type: String,
            required: [true, "The 'First name' field is required"],
        },
        lastName: {
            type: String,
            required: [true, "The 'Last name' field is required"],
        },
        profilePicture: {   // secure_url
            type: String,
        },
        profilePicturePublicId: {   // cloudinary public_id (so you can delete/replace images later)
            type: String,
        },
    },
);

const User = mongoose.model("User", userSchema);

export default User;