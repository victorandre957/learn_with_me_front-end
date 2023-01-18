import type { ApiTypes } from "../types/index";
import { isTruthy } from "../../truthy";
import { getErrorCode } from "./generalAdapter";

export default async function jsonAdapter(response: Response): Promise<ApiTypes.TAdapterReturn> {
  try {
    // Try decoding JSON
    const json = await response.json() as Record<string, unknown>;

    if (isTruthy(json.error)) {
      return {
        error: true,
        dataType: "json",
        data: json as JsonLike,
        ...getErrorCode(response.status),
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
