import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { userService } from "./user.services";

const createUserC = catchAsync(async (req, res) => {
  const result = await userService.createAdminS(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin created successfully.",
    data: result,
  });
});

export const userController = {
  createUserC,
};
