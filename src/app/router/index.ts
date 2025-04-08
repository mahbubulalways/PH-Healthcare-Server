import { Router } from "express";
import userRoutes from "../modules/user/user.route";
import adminRoutes from "../modules/admin/admin.route";
const router = Router();

const applicationRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
