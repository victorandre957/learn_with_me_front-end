import generalAdapter from "./apiAdapters/generalAdapter";
import jsonAdapter from "./apiAdapters/jsonAdapter";
import type * as ApiTypes from "./types/api";

export async function apiCall(
  params: ApiTypes.TApiCallParams,
): Promise<ApiTypes.TApiReturn> {
  const {
    method,
    url,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    noCache = false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body,
    headers,
    adapters: _adapters = [],
  } = params;

  const adapters = [..._adapters, jsonAdapter, generalAdapter];

  const config = {
    method,
    headers: {
      // "Cache-Control": noCache ? "no-cache" : "private, max-age=43200",
      ...headers,
    },
    body: body as string | undefined | FormData,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (body?.constructor?.name !== "FormData") {
    config.body = method !== "GET" ? JSON.stringify(body) : undefined;
  }

  let response: Response;
  try {
    response = await fetch(url, config);

    // eslint-disable-next-line no-restricted-syntax
    for (const adapter of adapters) {
      // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
      const ret = await adapter(response);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (ret) return ret;
    }

    throw new Error("No adapter treated this response.");
  } catch (err: unknown) {
    return {
      error: true,
      dataType: "unknown",
      data: {
        err,
        response,
        params,
      },
      title: "Erro inesperado",
      message:
        "Um erro inesperado ocorreu enquanto sua requisição era realizada.",
    };
  }
}
