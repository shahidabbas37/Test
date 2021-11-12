import express from "express";

import { AdminRouteApi } from "./admin.routes";
import { UserRouteApi } from "./user.routes";

export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.use("/admin", AdminRouteApi);
    this.router.use("/user", UserRouteApi);
  }
}
export const MainApi = new MainRouter().router;
