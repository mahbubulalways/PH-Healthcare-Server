import { Response } from "express";

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export const sendResponse = <T>(
  res: Response,
  payload: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: TMeta | null | undefined;
    data: T | null | undefined;
  }
): void => {
  res.status(payload?.statusCode).json({
    statusCode: payload?.statusCode,
    success: payload?.success,
    message: payload?.message,
    meta: payload?.meta || null || undefined,
    data: payload?.data || null || undefined,
  });
};
