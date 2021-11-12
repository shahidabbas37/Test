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
  createGroup,
  addUserToGroup,
  countWordInChat,
} from "../types/Request/admin.requests";
import { SECRIT_KEY } from "../utils/constant";
import { USER } from "../types/document/user.document";
import { GroupResponse } from "../types/Response/group.response";
import { GROUPMEMBERS } from "../types/document/groupMember";
import { groupMemberSchema } from "../models/groupMembers.model";
import { groupSchema } from "./../models/group.model";
import { CHAT } from "../types/document/chat.document";
import { UserChatResponse } from "../types/Response/user.response";
import { getMessageByText } from "./../types/Request/admin.requests";

@Route("admin")
@Tags("admin")
export class AdminController {
  constructor() {}

  @Post("/signup")
  async saveAdmin(@Body() Admin: signupReqAdmin): Promise<AdminResponse> {
    const admin: ADMIN | any = await new MainAdmin().saveAdmin(<ADMIN>Admin);

    return <AdminResponse>admin;
  }

  // create a jwt token and send back this will used for some admin related task
  @Post("/login")
  async login(@Body() Admin: loginReqAdmin): Promise<AdminResponse> {
    const admin: ADMIN | any = await new MainAdmin().getAdminByEmail(
      Admin.email
    );

    if (!admin) throw new ErrorHandler(404, "no Admin with this email");

    const validatePassword = await admin.comparePassword(Admin.password);
    if (!validatePassword) throw new ErrorHandler(404, "invalid password");

    admin.password = undefined;
    return <AdminResponse>admin;
  }

  @Post("/getAdmin")
  async getAdmin(@Body() Admin: getReqAdmin): Promise<AdminResponse> {
    const admin: ADMIN | any = await new MainAdmin().getAdmin(Admin.id);

    if (!admin) throw new ErrorHandler(404, "no admin with this id");
    admin.password = undefined;
    return <AdminResponse>admin;
  }

  @Delete("/deleteAdmin")
  async deleteAdmin(@Body() Admin: deleteReqAdmin): Promise<AdminResponse> {
    const token = await jwt.verify(Admin.token, SECRIT_KEY);
    if (!token)
      throw new ErrorHandler(
        404,
        "some error occured invalid token OR admin role"
      );
    console.log(token);
    const admin: ADMIN | any = await new MainAdmin().deleteAdmin(Admin.id);

    if (!admin) throw new ErrorHandler(404, "no admin with this id");
    admin.password = undefined;
    return <AdminResponse>admin;
  }

  // before updating checking existing value we will update only those filed
  // which are send by user
  @Put("/updateAdmin")
  async updateAdmin(@Body() Admin: updateReqAdmin): Promise<AdminResponse> {
    const oldAdmin: ADMIN | any = await new MainAdmin().getAdmin(Admin._id);
    if (!oldAdmin) throw new ErrorHandler(404, "no admin exist with this id");
    const token = await jwt.verify(Admin.token, SECRIT_KEY);
    if (!token)
      throw new ErrorHandler(
        404,
        "some error occured invalid token OR admin role"
      );
    console.log(token);
    if (Admin.password) {
      Admin.password = await bcrypt.hash(Admin.password, 10);
    }

    const updated_admin = {
      name: Admin.name || oldAdmin.name,
      email: Admin.email || oldAdmin.email,
      password: Admin.password || oldAdmin.password,
      username: Admin.username || oldAdmin.username,
      _id: Admin._id,
    };
    const admin: ADMIN | any = await new MainAdmin().updateAdmin(
      <ADMIN>updated_admin
    );

    if (!admin) throw new ErrorHandler(404, "no post with this id");
    admin.password = undefined;
    return <AdminResponse>admin;
  }

  @Post("/regUser")
  async regUser(@Body() User: regUserByAdmin): Promise<regUserByAdminResponse> {
    const user: USER | any = await new MainAdmin().regUser(<USER>User);

    return <regUserByAdminResponse>user;
  }

  // create a group

  @Post("/createGroup")
  async createGroup(@Body() Group: createGroup): Promise<GroupResponse> {
    const group: any = await new MainAdmin().createGroup(Group);

    if (!group)
      throw new ErrorHandler(404, "some error occured while creating group");

    return <GroupResponse>group;
  }

  // add a user to group

  @Post("/addUserToGroup")
  async addUserToGroup(
    @Body() GroupMember: addUserToGroup
  ): Promise<GroupResponse> {
    // check if user already added to group
    const user = await groupMemberSchema.findOne({
      userId: GroupMember.userId,
    });
    if (user) throw new ErrorHandler(500, "user already added to group");

    // check if group exist or not
    const grp = await groupSchema.findById({ _id: GroupMember.groupId });
    if (!grp) throw new ErrorHandler(404, "no group exist with id ");
    const groupMember: GROUPMEMBERS | any =
      await new MainAdmin().addUserToGroup(<GROUPMEMBERS>GroupMember);

    if (!groupMember)
      throw new ErrorHandler(
        404,
        "some error occured while adding user to group group"
      );

    return groupMember;
  }

  // get all messages

  @Get("/getAllMessages")
  async getAllMessages() {
    const messages: any = await new MainAdmin().getAllChat();

    if (!messages) throw new ErrorHandler(404, "no messages exists");

    return messages;
  }


  // search an sms by text
  @Post("/searchSMSByText")
  async searchSMSByText(
    @Body() req: getMessageByText
  ): Promise<UserChatResponse> {
    const sms: CHAT | any = await new MainAdmin().getSMSByText(req.text);

    if (!sms) throw new ErrorHandler(404, "no sms found with this text");

    return <UserChatResponse>sms;
  }

  // get all sms with specific text
  @Post("/countWordInChat")
  async countWordInChat(@Body() req: countWordInChat) {
    const word: any = await new MainAdmin().countWordFrequency(req.text);

    console.log(word);
    if (!word) throw new ErrorHandler(404, "no sms found with this word");

    return word;
  }
}
