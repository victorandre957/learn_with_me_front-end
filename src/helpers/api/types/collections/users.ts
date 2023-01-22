import type { TCommonStrapiRecords } from "../api";

export type TUserRolesResponse = TCommonStrapiRecords & {
  id: number,
  name?: string,
  description?: string,
};

export type TUserModel = {
  id?: number,
  name?: string,
  email?: string,
  password?: string,
};

export type TUserResponse = TCommonStrapiRecords & TUserModel;
