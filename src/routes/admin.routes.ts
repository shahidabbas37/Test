import express from "express";
import jwt from "jsonwebtoken";
//import authenticateToken from '../middlewares/jwt';
import {
  signupReqAdmin,
  loginReqAdmin,
  getReqAdmin,
  deleteReqAdmin,
  updateReqAdmin,
  regUserByAdmin,
  createGroup,
  addUserToGroup,
  countWordInChat,
} from "../types/Request/admin.requests";
import {
  AdminResponse,
  regUserByAdminResponse,
} from "../types/Response/admin.response";
import { AdminController } from "../controllers/admin.controller";
import { SECRIT_KEY } from "../utils/constant";
import { GroupResponse } from "../types/Response/group.response";
import { getMessageByText } from "./../types/Request/admin.requests";

export class AdminRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    // save a admin
    this.router.post("/signup", async (req, res, next) => {
      try {
        const getreq: signupReqAdmin = req.body;
        const admin: AdminResponse = await new AdminController().saveAdmin(
          getreq
        );
        res.status(201).json({
          msg: " admin has been saved",
          admin: admin,
        });
      } catch (error) {
        next(error);
      }
    });

    // login
    this.router.post("/login", async (req, res, next) => {
      try {
        const getreq: loginReqAdmin = req.body;
        const admin: AdminResponse = await new AdminController().login(getreq);
    
        let createToken = {
          id: admin._id,
          role: true,
        };
        const token = jwt.sign(
          JSON.parse(JSON.stringify(createToken)),
          SECRIT_KEY,
          {
            expiresIn: 60 * 60,
          }
        );

        res.status(201).json({
          msg: " admin has been loginedin",
          admin: admin,
          token: token,
        });
      } catch (error) {
        next(error);
      }
    });

    // get admin by id
    this.router.post("/getAdmin", async (req, res, next) => {
      try {
        const getreq: getReqAdmin = req.body;
        const admin: AdminResponse = await new AdminController().getAdmin(
          getreq
        );

        res.status(200).json({
          msg: "admin with this id : ",
          admin: admin,
        });
      } catch (error) {
        next(error);
      }
    });

    // delete a admin
    this.router.delete("/deleteAdmin", async (req, res, next) => {
      try {
        const getreq: deleteReqAdmin = req.body;

        const admin: AdminResponse = await new AdminController().deleteAdmin(
          getreq
        );
        res.status(200).json({
          msg: " admin has been deleted",
          admin: admin,
        });
        
      } catch (error) {
        next(error);
      }
    });

    // update admin
    this.router.put("/updateAdmin", async (req, res, next) => {
      try {
        const getreq: updateReqAdmin = req.body;
        const admin: AdminResponse = await new AdminController().updateAdmin(
          getreq
        );
        res.status(200).json({
          msg: " admin has been updated",
          post: admin,
        });
        
      } catch (error) {
        next(error);
      }
    });

    // save a user by admin
    this.router.post("/regUser", async (req, res, next) => {
      try {
        const getreq: regUserByAdmin = req.body;
        const user: regUserByAdminResponse =
          await new AdminController().regUser(getreq);
        res.status(201).json({
          msg: " user has been saved",
          user: user,
        });
      } catch (error) {
        next(error);
      }
    });

    // create a group
    this.router.post("/createGroup", async (req, res, next) => {
      try {
        const getreq: createGroup = req.body;
        const group: GroupResponse | any =
          await new AdminController().createGroup(getreq);
        res.status(201).json({
          msg: " group has been saved",
          group: group,
        });
      } catch (error) {
        next(error);
      }
    });

    // add user to  group
    this.router.post("/addUserToGroup", async (req, res, next) => {
      try {
        const getreq: addUserToGroup = req.body;
        const group: any = await new AdminController().addUserToGroup(getreq);
        res.status(201).json({
          msg: " user has been added to group",
          group: group,
        });
      } catch (error) {
        next(error);
      }
    });

    // get all chat
    this.router.get("/getAllMessages", async (req, res, next) => {
      try {
        const chat: any = await new AdminController().getAllMessages();
        res.status(201).json({
          msg: " all messages : ",
          chat: chat,
        });
      } catch (error) {
        next(error);
      }
    });

    // get sms By text
    this.router.post("/searchSMSByText", async (req: any, res, next) => {
      try {
        const getreq: getMessageByText = req.body;
        const sms: any = await new AdminController().searchSMSByText(getreq);
        res.status(200).json({
          msg: " this is sms by text",
          sms: sms,
        });
        
      } catch (error) {
        next(error);
      }
    });

    // count word frequency  countWordInChat
    this.router.post("/countWordInChat", async (req: any, res, next) => {
      try {
        const getreq: countWordInChat = req.body;
        const sms: any = await new AdminController().countWordInChat(getreq);
        res.status(200).json({
          msg: " no of occurance of word",
          sms: sms,
        });
       
      } catch (error) {
        next(error);
      }
    });
  }
}

export const AdminRouteApi = new AdminRoutes().router;
