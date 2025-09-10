type TUserRole = "admin" | "superAdmin";

export interface IUser {
  createdAt: Date;
  email: string;
  id: string;
  password: string;
  role: TUserRole;
  updatedAt: Date;
  userName: string;
}
