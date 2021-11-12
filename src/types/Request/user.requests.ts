export interface updateReqUser {
  _id: string;

  email: string;
  password: string;
  username: string;
}

export interface deleteReqUser {
  id: string;
}
export interface loginReqUser {
  email: string;
  password: string;
}
export interface getReqUser {
  id: string;
}
export interface chatReqUser {
  text: string;
  groupInfo: string;
}
