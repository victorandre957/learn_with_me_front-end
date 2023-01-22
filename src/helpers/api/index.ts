import { Dialog } from "szot-ui-experimental";
import type { ApiTypes } from "./types";
import { error } from "./logger";

/** Strapi collections */
import users from "./users";

export function showToUserError(apiData: ApiTypes.TApiReturn): void {
  if (apiData.error) {
    error("showToUserError", apiData);
    Dialog.error({
      title: apiData.title,
      content: apiData.message,
    });
  } else {
    // If get in here is because we have an error at the api function
    error("showToUserError - Unknown error", apiData);
    throw new Error("Unknown error on api functions");
  }
}

export const strapiApi = {
  users,
};
