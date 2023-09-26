//
import express, { Request, Response, Application } from "express";
import config from "./config";
import v1Routes from "./routes/v1Routes";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDbase } from "./utils/dbConnection";

//
const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(helmet());

//
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to chat app");
});

//
app.use("/api/v1", v1Routes);

//
app.listen(config.PORT, () => {
  console.log(`Server is Fire at http://localhost:${config.PORT}`);
  connectDbase();
  console.log("DB Connected!");
});
