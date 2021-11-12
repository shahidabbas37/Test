import express from "express";
import {
  loginReqUser,
  deleteReqUser,
  getReqUser,
  updateReqUser,
  chatReqUser,
} from "../types/Request/user.requests";
import {
  UserResponse,
  UserChatResponse,
} from "../types/Response/user.response";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    // login
    this.router.post("/Userlogin", async (req, res, next) => {
      try {
        const getreq: loginReqUser = req.body;
        const user: UserResponse = await new UserController().Userlogin(getreq);

        res.status(201).json({
          msg: " user has been loginedin",
          user: user,
        });
      } catch (error) {
        next(error);
      }
    });

    // delete a user
    this.router.delete("/deleteUser", async (req, res, next) => {
      try {
        const getreq: deleteReqUser = req.body;

        const user: UserResponse = await new UserController().deleteUser(
          getreq
        );
        res.status(200).json({
          msg: " user has been deleted",
          user: user,
        });
       
      } catch (error) {
        next(error);
      }
    });

    // get user by id
    this.router.post("/getUser", async (req, res, next) => {
      try {
        const getreq: getReqUser = req.body;
        const user: UserResponse = await new UserController().getUser(getreq);

        res.status(200).json({
          msg: "user with this id : ",
          user: user,
        });
      } catch (error) {
        next(error);
      }
    });

    // update admin
    this.router.put("/updateUser", async (req, res, next) => {
      try {
        const getreq: updateReqUser = req.body;
        const user: UserResponse = await new UserController().updateUser(
          getreq
        );
        res.status(200).json({
          msg: " user has been updated",
          user: user,
        });
       
      } catch (error) {
        next(error);
      }
    });

    // user chat
    this.router.post("/userChat", async (req, res, next) => {
      try {
        const getreq: chatReqUser = req.body;
        const chat: UserChatResponse | any =
          await new UserController().userChat(getreq);

        res.status(200).json({
          msg: "message sent.... ",
          chat: chat,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

export const UserRouteApi = new UserRoutes().router;
