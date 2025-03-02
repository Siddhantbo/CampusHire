import express from "express";
import { userRegister, userLogin } from "../Controllers/UserController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// All the below is for residence
router.post("/register", userRegister);
router.post("/login", userLogin);
// router.put("/updateaccount/:id", authMiddleware, userAccountUpdate);
// router.get("/useraccountdetails/:id", authMiddleware, userAccountDetails);

export default router;
