import type { userRoles } from "../../../purchasing-service/src/common/enums/roles.enum";

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type UserData = {
  id: string;
  fullName: string;
  email: string;
  role: userRoles;
  division: string;
};

export type LoginResponse = {
  access_token: string;
  user: UserData;
};
