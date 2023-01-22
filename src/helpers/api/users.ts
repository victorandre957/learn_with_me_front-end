import { strapiApiGenerator, getStrapiApi } from "./strapiCore";
import type { ApiTypes, Collections } from "./types/index";

const generatedFunctions = strapiApiGenerator<
  Collections.Users.TUserModel,
  Collections.Users.TUserResponse
>("users");

/* User */
export type TGetUserReturn = ApiTypes.TApiReturn<"record", Collections.Users.TUserModel>;

export default {
  ...generatedFunctions,

  async me(): Promise<TGetUserReturn> {
    const result: ApiTypes.TApiReturn = await getStrapiApi({ path: "users/me" }, true);
    if (!result.error && result.dataType === "json") {
      return {
        ...result,
        dataType: "record",
        data: result.data as Collections.Users.TUserResponse,
      };
    }
    return result;
  },
};
