import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { sendResponse, TMeta } from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { adminService } from "./admin.services";

const getAllAdminC = catchAsync(async (req, res) => {
  const filtering = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortOrder", "sortBy"]);
  const result = await adminService.getAllAdminS(filtering, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admins retrieve successfully.",
    meta: result?.meta as TMeta,
    data: result.data,
  });
});

// * GET ADMIN BY ID
const getAdminByIdC = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.getAdminByIdS(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin retrieve successfully.",
    data: result,
  });
});

// * UPDATE ADMIN BY ID
const updateAdminByIdC = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await adminService.updateAdminByIdS(id, body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin update successfully.",
    data: result,
  });
});

// * HARD DELETE ADMIN
const deleteAdminByIdC = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await adminService.deleteAdminByIdS(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin delete successfully.",
    data: result,
  });
});

// * SOFT DELETE ADMIN
const softDeleteAdminByIdC = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.softDeleteAdminByIdS(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin delete successfully.",
    data: result,
  });
});

export const adminController = {
  getAllAdminC,
  getAdminByIdC,
  updateAdminByIdC,
  deleteAdminByIdC,
  softDeleteAdminByIdC,
};
