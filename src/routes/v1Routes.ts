import express from "express";
import authRoutes from "./authRoutes";
import statusRoute from "./statusRoutes";

const v1Routes = express();

v1Routes.use("/auth", authRoutes);
v1Routes.use("/status", statusRoute);


export default v1Routes;
  