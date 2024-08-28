import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { registerUser,
         loginUser,
         logoutUser,
         refreshAccessToken,
         updatePassword,
         getCurrentUser,
         updateUserProfile,
         updateUserAvatar,
         updateUserCoverImage,
         deleteUser,
         getUserChannelProfile,
         getUserWatchHistory,
       } from "../controllers/user.controller.js";


const userRouter = express.Router()

userRouter.route("/register").post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
    ]),
    registerUser
)

userRouter.route("/login").post(loginUser);

// Secured Routes (user must be Logged In)
userRouter.route("/logout").post(verifyToken, logoutUser);
userRouter.route("/refresh_access_token").post(refreshAccessToken);
userRouter.route("/update_password").post(verifyToken, updatePassword);
userRouter.route("/get_current_user").get(verifyToken, getCurrentUser);
userRouter.route("/update_profile").patch(verifyToken, updateUserProfile);
userRouter.route("/update_avatar").patch(verifyToken, upload.single('avatar'), updateUserAvatar);
userRouter.route("/update_cover_image").patch(verifyToken, upload.single('coverImage'), updateUserCoverImage);
userRouter.route("/delete_user").delete(verifyToken, deleteUser);

userRouter.route("/c/:username").get(verifyToken, getUserChannelProfile);
userRouter.route("/watch_history").get(verifyToken, getUserWatchHistory);


export {userRouter}
