import express from "express";
import { homePage } from "../Controllers/DefaultController.js";

const router = express.Router();

router.get("/", homePage);

export default router;
