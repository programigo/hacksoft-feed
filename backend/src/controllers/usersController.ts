import { type Request, type Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.ts";
import uploadBufferToCloudinary from "../utils/uploadBufferToCloudinary.ts";
import cloudinary from "../config/cloudinary.ts";
import Post from "../models/Post.ts";

export async function registerUser(req: Request, res: Response) {
    try {
        const {
            username,
            password,
            email,
            firstName,
            lastName,
            jobTitle,
        } = req.body;

        if (!username || !password || !email || !firstName || !lastName || !jobTitle) {
            return res.status(400).json({ message: "Please add all fields required for registering a user" });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: "There is already a user registered with that email" });
        }

        // Hash password
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        // If there's a profile picture, upload to Cloudinary
        let profilePictureUrl = undefined;
        let profilePicturePublicId = undefined;

        if (req.file && req.file.buffer) {
            const uploadOptions = {
                public_id: `${username}-${Date.now()}`,
                overwrite: true,
                resource_type: "image",
            };

            try {
                const result = await uploadBufferToCloudinary(req.file.buffer, uploadOptions);
                profilePictureUrl = result.secure_url || result.url;
                profilePicturePublicId = result.public_id;
            } catch (uploadError: any) {
                console.error("Cloudinary upload error:", uploadError);
                res.status(500).json({ message: "Failed to upload profile picture" });
            }
        }

        // Create user
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
            jobTitle,
            profilePicture: profilePictureUrl,
            profilePicturePublicId,
        });

        if (!user) {
            return res.status(400).json({ message: "Ïnvalid user data" });
        }

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            jobTitle: user.jobTitle,
            profilePicture: user.profilePicture,
            token: generateToken(user._id),
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.toString() });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (user && passwordsMatch) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                jobTitle: user.jobTitle,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid login credentials" });
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.toString() });
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resultUser = await User.findById(user.id).select("-password");

        res.status(200).json(resultUser);
    } catch (error: any) {
        console.error(error);
        res.status(401).json({ message: error.toString() });
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.error(error);
        res.status(401).json({ message: error.toString() });
    }
}

export async function updateProfile(req: Request, res: Response) {
    try {
        const { firstName, lastName, jobTitle } = req.body ?? {};

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate input
        if (firstName === undefined && lastName === undefined && jobTitle == undefined) {
            return res.status(400).json({
                message: "At least one field (firstName, lastName or jobTitle) must be provided",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (firstName !== undefined) {
            user.firstName = firstName;
        }

        if (lastName !== undefined) {
            user.lastName = lastName;
        }

        if (jobTitle !== undefined) {
            user.jobTitle = jobTitle;
        }

        // Save changes to the database
        await user.save();

        // Return updated user profile
        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                jobTitle: user.jobTitle,
            },
        });
    } catch (error: any) {
        console.error(error);
        res.status(401).json({ message: error.toString() });
    }
}

export async function changePassword(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Check required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }

        // Confirm new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        // Verify old password
        const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Prevent reusing the same password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({ message: "New password must be different from the old password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save new password
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error: any) {
        console.error(error);
        res.status(401).json({ message: error.toString() });
    }
}

export async function updateProfilePicture(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        const buffer = req.file?.buffer;

        if (!buffer) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove old Cloudinary image (if exists)
        if (user.profilePicturePublicId) {
            await cloudinary.uploader.destroy(user.profilePicturePublicId);
        }

        // Upload new picture
        const uploadOptions = {
            public_id: `${user.username}-${Date.now()}`,
            resource_type: "image",
        };

        const result = await uploadBufferToCloudinary(buffer, uploadOptions);

        // Update user
        user.profilePicture = result.secure_url;
        user.profilePicturePublicId = result.public_id;

        await user.save();

        res.json({
            message: "Profile picture updated",
            profilePicture: user.profilePicture,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile picture" + error.toString() });
    }
}

export async function getUserStats(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = req.user.id;

        const createdPostsCount = await Post.countDocuments({ userId });
        const likedPostsCount = await Post.countDocuments({ likedBy: userId });

        res.status(200).json({ createdPostsCount, likedPostsCount });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user stats" + error.toString() });
    }
}