import { isTruthy } from "../../truthy";
import type * as ApiTypes from "../types/api";

type TStrapiError = {
  "status": number, // HTTP status
  "name": string, // Strapi error name ('ApplicationError' or 'ValidationError')
  "message": string, // A human reable error message
  "details": JsonLike, // error info specific to the error type
}

function parseError(err: TStrapiError): { title: string, message: string } {
  const title = err.name;
  const { message } = err;

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
