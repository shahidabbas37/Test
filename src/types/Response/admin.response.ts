export interface AdminResponse {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface regUserByAdminResponse {
  _id: string;
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}
