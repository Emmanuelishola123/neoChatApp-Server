import { Router } from "express";
import authControllers from "../controllers/authControllers";
import { processRequestBody } from "zod-express-middleware";
import { registerUserSchema } from "../schema/authSchema";


//
const authRoutes = Router();

//
authRoutes.post(
  "/register",
  processRequestBody(registerUserSchema.body),
  authControllers.registerUser,
);
authRoutes.post("/login", authControllers.loginUser);
authRoutes.put("/forgot-password");
authRoutes.put("/reset-password/:token");

//
export default authRoutes;
