import qs from "qs";
import strapiAdapter from "./apiAdapters/strapiAdapter";
import type * as ApiTypes from "./types/api";
import simplifyStrapiResponse from "../simplifyStrapiResponse";
import { keysToCamel, keysToSnake, valuesToSnake } from "../utils";
import { apiCall } from "./apiCore";

const urlBase = "http://localhost:1337";

/**
 * Get strapi params, adding content type, auth token,
 * and changing the body params to snake case to match strapi/DB pattern.
 */
const getStrapiParams = (
  method: ApiTypes.TMethod,
  params: ApiTypes.TStrapiApiParams,
  enableAuth: boolean,
): ApiTypes.TApiCallParams => {
  let { body } = params;
  let headers: HeadersInit = {};

  if (body?.constructor?.name !== "FormData") {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    body = keysToSnake(params.body as JsonLike | JsonLike[]);
  }

  if (enableAuth && localStorage.jwt) headers.Authorization = `Bearer ${localStorage.jwt as string}`;

  return {
    method,
    adapters: [strapiAdapter],
    headers: {
      ...headers,
      ...params.headers,
    },
    ...params,
    url: `${urlBase}/api/${params.path}`,
    body,
  };
};

/**
 * Convert the return of strapi to Camel case, because de key/columns at DB is snake case.
 */
const apiCallWithCamel = (
  params: ApiTypes.TApiCallParams,
): Promise<ApiTypes.TApiReturn> => apiCall(params)
  .then((r) => keysToCamel(r as JsonLike) as ApiTypes.TApiReturn);

export const getStrapiApi = (
  params: ApiTypes.TStrapiApiParams,
  enableAuth = true,
): Promise<ApiTypes.TApiReturn> => apiCallWithCamel(getStrapiParams("GET", params, enableAuth));

export const postStrapiApi = (
  params: ApiTypes.TStrapiApiParams,
  enableAuth = true,
): Promise<ApiTypes.TApiReturn> => apiCallWithCamel(getStrapiParams("POST", params, enableAuth));

export const putStrapiApi = (
  params: ApiTypes.TStrapiApiParams,
  enableAuth = true,
): Promise<ApiTypes.TApiReturn> => apiCallWithCamel(getStrapiParams("PUT", params, enableAuth));

export const patchStrapiApi = (
  params: ApiTypes.TStrapiApiParams,
  enableAuth = true,
): Promise<ApiTypes.TApiReturn> => apiCallWithCamel(getStrapiParams("PATCH", params, enableAuth));

export const deleteStrapiApi = (
  params: ApiTypes.TStrapiApiParams,
  enableAuth = true,
): Promise<ApiTypes.TApiReturn> => apiCallWithCamel(getStrapiParams("DELETE", params, enableAuth));

type TStrapiGenerator<TParams, TResponse> = {
  fetch(_query?: JsonLike, noCache?: boolean): Promise<ApiTypes.TApiReturn<"record", TResponse[]>>,
  create(params: TParams): Promise<ApiTypes.TApiReturn<"record", TResponse>>,
  update(id: number, params: TParams): Promise<ApiTypes.TApiReturn<"record", TResponse>>,
  delete(id: number): Promise<ApiTypes.TApiReturn<"record", TResponse>>
}

export const strapiApiGenerator = <TParams extends JsonLike, TResponse extends JsonLike>(
  collectionPath: string,
): TStrapiGenerator<TParams, TResponse> => ({
    async fetch(_query?: JsonLike, noCache = false): Promise<ApiTypes.TApiReturn<"record", TResponse[]>> {
      let url = collectionPath;

      if (_query) {
        // transform keys and values from camelCase to snake case,
        // because keys/columns of DB is snake case,
        // and the values i don't remember why we transforme to snake case too.
        const query = qs.stringify(keysToSnake(valuesToSnake(_query)));
        url = `${url}?${query}`;
      }

      const result: ApiTypes.TApiReturn<"record", TResponse> = await getStrapiApi({
        path: url,
        noCache,
      });

      if (!result.error && result.dataType === "json") {
        const collection = (result.data as Record<string, unknown>).data;
        return {
          ...result,
          dataType: "record",
          data: simplifyStrapiResponse(collection) as TResponse[],
        };
      }

      return result;
    },

    async create(params: TParams): Promise<ApiTypes.TApiReturn<"record", TResponse>> {
      const result: ApiTypes.TApiReturn<"record", TResponse> = await postStrapiApi({
        path: collectionPath,
        body: {
          data: params,
        },
      });

      if (!result.error && result.dataType === "json") {
        const record = (result.data as Record<string, unknown>).data;
        return {
          ...result,
          dataType: "record",
          data: simplifyStrapiResponse(record) as TResponse,
        };
      }

      return result;
    },

    async update(id: number, params: TParams): Promise<ApiTypes.TApiReturn<"record", TResponse>> {
      const result: ApiTypes.TApiReturn<"record", TResponse> = await putStrapiApi({
        path: `${collectionPath}/${id}`,
        body: {
          data: params,
        },
      });

      if (!result.error && result.dataType === "json") {
        const record = (result.data as Record<string, unknown>).data;
        return {
          ...result,
          dataType: "record",
          data: simplifyStrapiResponse(record) as TResponse,
        };
      }

      return result;
    },

    async delete(id: number): Promise<ApiTypes.TApiReturn<"record", TResponse>> {
      const result: ApiTypes.TApiReturn<"record", TResponse> = await deleteStrapiApi({
        path: `${collectionPath}/${id}`,
      });

      if (!result.error && result.dataType === "json") {
        const record = (result.data as Record<string, unknown>).data;
        return {
          ...result,
          dataType: "record",
          data: simplifyStrapiResponse(record) as TResponse,
        };
      }

      return result;
    },
  });
