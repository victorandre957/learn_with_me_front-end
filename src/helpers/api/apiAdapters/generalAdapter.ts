import type { ApiTypes } from "../types/index";

type TErrorMessage = {
  title: string,
  message: string,
}

export function getErrorCode(errorCode: number): TErrorMessage {
  const errorCodeMappings: Record<number, string | TErrorMessage> = {
    404: "Página não encontrada",
    401: "Acesso Negado",
  };

  if (!Object.keys(errorCodeMappings).includes(`${errorCode}`)) {
    return {
      title: "Erro desconhecido",
      message: `Erro de código desconhecido: ${errorCode}.`,
    };
  }

  if (typeof errorCodeMappings[errorCode] === "string") {
    return {
      title: errorCodeMappings[errorCode] as string,
      message: errorCodeMappings[errorCode] as string,
    };
  }

  return errorCodeMappings[errorCode] as TErrorMessage;
}

export default function generalAdapter(response: Response): ApiTypes.TAdapterReturn {
  if (!response.ok) {
    return {
      error: true,
      dataType: "response",
      data: response,
      ...getErrorCode(response.status),
    };
  }

  return {
    error: false,
    dataType: "response",
    data: response,
  };
}
