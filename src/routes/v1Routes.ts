import express from "express";
import authRoutes from "./authRoutes";

const v1Routes = express();

v1Routes.use("/auth", authRoutes);

export default v1Routes;
