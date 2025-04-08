import { Admin, EUserStatus, Prisma } from "@prisma/client";
import { adminSearchFields } from "./admin.constant";
import calculatePagination from "../../../helpers/calculatePagination";
import prisma from "../../../helpers/prisma";

// * GET ALL ADMINS WITH FILTERING
const getAllAdminS = async (params: any, options: any) => {
  const { search, ...otherFields } = params;

  const { page, skip, limit, sortBy, sortOrder } = calculatePagination(options);

  const andConditions: Prisma.AdminWhereInput[] = [
    {
      AND: {
        isDeleted: false,
      },
    },
  ];

  if (search) {
    andConditions.push({
      OR: adminSearchFields.map((field) => ({
        [field]: {
          contains: params.search,
          mode: "insensitive",
        },
      })),
    });
  }

  //   INDIVIDUAL FIELD
  if (Object.keys(otherFields).length > 0) {
    andConditions.push({
      AND: Object.keys(otherFields).map((key) => ({
        [key]: {
          equals: otherFields[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  // const totalData = await prisma.admin.count();
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy as string]: sortOrder,
    },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  const data = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
  return data;
};

// * GET ADMIN BY ID

const getAdminByIdS = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  return result;
};

// * UPDATE ADMIN BY ID
const updateAdminByIdS = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

// * HARD DELETE ADMIN BY ID
const deleteAdminByIdS = async (id: string): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    const deleteFromAdmin = await tx.admin.delete({
      where: {
        id,
      },
    });
    await tx.user.delete({
      where: {
        email: deleteFromAdmin.email,
      },
    });
    return deleteFromAdmin;
  });

  return result;
};

// * SOFT DELETE ADMIN BY ID
const softDeleteAdminByIdS = async (id: string): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = prisma.$transaction(async (tx) => {
    const changeStatusAdmin = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await prisma.user.update({
      where: {
        email: changeStatusAdmin.email,
      },
      data: {
        status: EUserStatus.DELETED,
      },
    });
    return changeStatusAdmin;
  });

  return result;
};

export const adminService = {
  getAllAdminS,
  getAdminByIdS,
  updateAdminByIdS,
  deleteAdminByIdS,
  softDeleteAdminByIdS,
};
