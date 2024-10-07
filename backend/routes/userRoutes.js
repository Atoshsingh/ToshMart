import express from "express";

const router = express.Router();
import {updateUserById,getUserById,deleteUserById,updateCurrentUserProfile , logoutCurrentUser, createUser ,getCurrentUserProfile , loginUser , getAllUsers } from "../controllers/userController.js";
import { authenticate ,authorizedAdmin  } from "../middlewares/authMiddleware.js";

router.route('/').post(createUser).get(authenticate , authorizedAdmin , getAllUsers);
router.post("/auth",loginUser);
router.post("/logout",logoutCurrentUser);
router.route("/profile").get(authenticate , getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);


//ADMIN ROUTES ONLY 
router
    .route("/:id")
        .delete(authenticate,authorizedAdmin,deleteUserById)
        .get(authenticate, authorizedAdmin , getUserById)
        .put(authenticate , authorizedAdmin , updateUserById)
export default router;


