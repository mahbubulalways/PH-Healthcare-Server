import { EUserROle } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../helpers/prisma";
const createAdminS = async (payload) => {
  const hashPassword = await bcrypt.hash(payload?.password, 12);
  const userData = {
    email: payload?.data?.email,
    password: hashPassword,
    role: EUserROle.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: userData,
    });
    const newAdmin = await tx.admin.create({
      data: payload?.data,
    });
    return newAdmin;
  });
  return result;
};

export const userService = {
  createAdminS,
};
