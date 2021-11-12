export interface signupReqAdmin {
  name: string;
  email: string;
  password: string;
  username: string;
  role: boolean;
}
export interface updateReqAdmin {
  _id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  role: boolean;
  token: string;
}

export interface deleteReqAdmin {
  id: string;
  token: string;
}
export interface loginReqAdmin {
  email: string;
  password: string;
}
export interface getReqAdmin {
  id: string;
}

export interface regUserByAdmin {
  email: string;
  password: string;
  username: string;
}

export interface createGroup {
  groupName: string;
}

export interface addUserToGroup {
  userId: string;
  groupId: string;
}

export interface getMessageByText {
  text: string;
}

export interface countWordInChat {
  text: string;
}
