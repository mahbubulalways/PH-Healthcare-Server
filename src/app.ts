import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import applicationsRoutes from "./app/router";
import { sendResponse } from "./shared/sendResponse";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// * APPLICATION ROUTES INVOKE HERE!!
app.use("/api/v1", applicationsRoutes);
// * ROOT TESTING ROUTE!!
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "PH Health Care Server is Under Development.OK?",
    data: null,
  });
});

app.use(globalErrorHandler);
app.use("*", notFound);
export default app;
