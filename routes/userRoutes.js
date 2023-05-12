import express from "express";
import { createUser } from "../controllers/UserController.js";

const router = express.Router();

router.route("/data").post(createUser);

export default router;
