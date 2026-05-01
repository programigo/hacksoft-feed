import express from "express";
import { upload } from "../middleware/multer.js";
import {
    changePassword,
    getMe,
    getUser,
    getUserStats,
    loginUser,
    registerUser,
    updateProfile,
    updateProfilePicture
} from "../controllers/usersController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateProfile);
router.post("/me/change-password", protect, changePassword);
router.put("/me/update-profile-picture", protect, upload.single("profilePicture"), updateProfilePicture);
router.get("/me/get-stats", protect, getUserStats);
router.get("/:id", getUser);

export default router;