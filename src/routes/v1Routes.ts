import express from "express";
import authRoutes from "./authRoutes";
import statusRoute from "./statusRoutes";
import userRoutes from "./userRoutes";

const v1Routes = express();

v1Routes.use("/auth", authRoutes);
v1Routes.use("/status", statusRoute);
v1Routes.use("/user", userRoutes);


export default v1Routes;
  