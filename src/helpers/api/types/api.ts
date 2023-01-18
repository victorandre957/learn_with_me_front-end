type TErrorMessage = {
  error: false
} | {
  error: true,
  title: string,
  message: string
};
type TResponseData<K extends string, T> = {
  dataType: "json",
  data: JsonLike,
} | {
  dataType: "response",
  data: Response,
} | {
  dataType: "unknown",
  data: unknown,
} | {
  dataType: K,
  data: T
};
export type TApiReturn<K extends string = "unknown", T = unknown> = TErrorMessage & TResponseData<K, T>;

export type TAdapterReturn = TApiReturn | false

export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TApiParams = {
  url: string,
  noCache?: boolean,
  headers?: HeadersInit,
  body?: JsonLike | FormData,
}
export type TStrapiApiParams = Omit<TApiParams, "url"> & {
  path: string,
}

export type TApiCallParams = {
  method: TMethod,
  adapters?: Array<(response: Response)=> TAdapterReturn | Promise<TAdapterReturn>>,
} & TApiParams;

export type TCommonStrapiRecords = {
  createdAt?: string, // ISO date
  updatedAt?: string, // ISO date
}

export type TStrapiRelationManyParam = string | number | Array<string | number>
export type TStrapiRelationOneParam = string | number
