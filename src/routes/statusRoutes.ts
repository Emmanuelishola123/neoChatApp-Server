import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import statusControllers from "../controllers/statusControllers";
import { statusSchema } from "../schema/statusSchema";

//
const statusRoute = Router();

statusRoute.post(
  "/create",
  processRequestBody(statusSchema.body),
  statusControllers.createStatus,
);

export default statusRoute;
