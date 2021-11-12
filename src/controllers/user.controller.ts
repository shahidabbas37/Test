import ErrorHandler from "../utils/error";
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  SuccessResponse,
} from "tsoa";

import jwt from "jsonwebtoken";
import { MainAdmin } from "../repositories/admin.repositories";
import bcrypt from "bcrypt";
import { ADMIN } from "../types/document/admin.document";
import {
  AdminResponse,
  regUserByAdminResponse,
} from "../types/Response/admin.response";
import {
  signupReqAdmin,
  loginReqAdmin,
  getReqAdmin,
  deleteReqAdmin,
  updateReqAdmin,
  regUserByAdmin,
} from "../types/Request/admin.requests";
import { SECRIT_KEY } from "../utils/constant";
import { USER } from "../types/document/user.document";
import {
  loginReqUser,
  deleteReqUser,
  getReqUser,
  updateReqUser,
  chatReqUser,
} from "../types/Request/user.requests";
import {
  UserChatResponse,
  UserResponse,
} from "../types/Response/user.response";
import { MainUser } from "../repositories/user.repositories";
import { CHAT } from "./../types/document/chat.document";

@Route("user")
@Tags("user")
export class UserController {
  constructor() {}

  @Post("/Userlogin")
  async Userlogin(@Body() User: loginReqUser): Promise<UserResponse> {
    const user: USER | any = await new MainUser().getUserByEmail(User.email);
    if (!user) throw new ErrorHandler(404, "no User with this email");

    const validatePassword = await user.comparePassword(User.password);
    if (!validatePassword) throw new ErrorHandler(404, "invalid password");

    user.password = undefined;
    return <UserResponse>user;
  }

  
  @Delete("/deleteUser")
  async deleteUser(@Body() User: deleteReqUser): Promise<UserResponse> {
    const user: USER | any = await new MainUser().deleteUser(User.id);

    if (!user) throw new ErrorHandler(404, "no user with this id");
    user.password = undefined;
    return <UserResponse>user;
  }

  @Post("/getUser")
  async getUser(@Body() User: getReqUser): Promise<UserResponse> {
    const user: ADMIN | any = await new MainUser().getUserById(User.id);

    if (!user) throw new ErrorHandler(404, "no user with this id");
    user.password = undefined;
    return <UserResponse>user;
  }
  @Put("/updateUser")
  async updateUser(@Body() User: updateReqUser): Promise<UserResponse> {
    const oldUser: USER | any = await new MainUser().getUserById(User._id);
    if (!oldUser) throw new ErrorHandler(404, "no user exist with this id");

    if (User.password) {
      User.password = await bcrypt.hash(User.password, 10);
    }

    const updated_user = {
      email: User.email || oldUser.email,
      password: User.password || oldUser.password,
      username: User.username || oldUser.username,
      _id: User._id,
    };
    const user: USER | any = await new MainUser().updateUser(
      <USER>updated_user
    );

    if (!user) throw new ErrorHandler(404, "no user with this id");
    user.password = undefined;
    return <UserResponse>user;
  }

  // user chat

  @Post("/userChat")
  async userChat(@Body() Chat: chatReqUser): Promise<UserChatResponse> {
    const chat: CHAT | any = await new MainUser().chatUser(<CHAT>Chat);

    if (!chat) throw new ErrorHandler(404, "some error occured while chatting");

    return <UserChatResponse>chat;
  }
}
