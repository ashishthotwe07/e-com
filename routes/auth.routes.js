import express from "express";
import userController from "../controller/auth.controller.js";

const router = express.Router();

// Route to register a new user
router.post("/register", userController.register);

// Route to login
router.post("/login", userController.login);
router.get("/all-users", userController.getAllUsers);
router.delete("/:id", userController.deleteAUser);
router.put("/:id", userController.updateUser);

export default router;
