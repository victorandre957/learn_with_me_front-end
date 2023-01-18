import { isTruthy } from "../../truthy";
import { titleError, messageError } from "./translateMessages";
import type { TTitle, TMessage } from "./types";
import type { ApiTypes } from "../types/index";

type TStrapiError = {
  "status": number, // HTTP status
  "name": string, // Strapi error name ('ApplicationError' or 'ValidationError')
  "message": string, // A human reable error message
  "details": JsonLike, // error info specific to the error type
}

type TValidationErrorDetails = {
  errors: {
    path: string[],
    name: string,
    message: string
  }[]
}

function parseError(err: TStrapiError): { title: string, message: string } {
  let title = err.name;
  let { message } = err;

  if (titleError[title as TTitle] !== undefined) {
    title = titleError[title as TTitle];
  }

  if (JSON.stringify(err.details) === "{}") {
    // skip not translated message
    if (messageError[message as TMessage]) {
      message = messageError[message as TMessage];
    }
  } else {
    const { errors } = err.details as TValidationErrorDetails;
    const objMessages = {} as Record<string, string[]>;

    errors.forEach((error) => {
      let msg = error.message;
      if (messageError[error.message as TMessage] !== undefined) {
        msg = messageError[error.message as TMessage];
      }
      const item = error.path[0];

      if (objMessages[msg] === undefined) {
        objMessages[msg] = [item];
      } else {
        objMessages[msg].push(item);
      }
    });

    message = (JSON.stringify(objMessages, null, " "))
      .replace(/"/g || /'/g, "")
      .replace(/[-/\\^$*+?.()|{}]/g, "")
      .replace(/,/, "\n");
  }

  return { title, message };
}

export default async function strapiAdapter(response: Response): Promise<ApiTypes.TAdapterReturn> {
  try {
    // Try decoding JSON
    const json = await response.json() as Record<string, unknown>;

    if (isTruthy(json.error)) {
      const { title, message } = parseError(json.error as TStrapiError);

      return {
        error: true,
        dataType: "json",
        data: json as JsonLike,
        title,
        message,
      };
    }

    return {
      error: false,
      dataType: "json",
      data: json as JsonLike,
    };
  } catch {
    return false; // Calls the next adapter
  }
}
