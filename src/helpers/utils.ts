import type { Stringify } from "../types/utils";
import { isEmpty } from "./truthy";

export function unflatten(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  Object.entries(data).forEach(([k, v]) => {
    const keys = k.split(".");
    keys.reduce((r, e, j) => {
      if (r[e]) return r[e];
      const temp: unknown = (keys.length - 1 === j ? v : {});
      r[e] = Number.isNaN(Number(keys[j + 1])) ? temp : [];
      return r[e];
    }, result);
  });

  return result;
}

export function extractSelectValue(flattenData: Record<string, unknown>, valueKey = "value"): Record<string, unknown> {
  const copied = JSON.parse(JSON.stringify(flattenData)) as Record<string, unknown>;
  Object.entries(copied).forEach(([k, v]) => {
    if (!v) return;

    if (Array.isArray(v)) {
      copied[k] = v.map((x: Record<string, unknown>) => x[valueKey]);
    } else if (!isEmpty(v[valueKey])) {
      copied[k] = v[valueKey];
    }
  });
  return copied;
}

export function removeEmpty(object: Record<string, unknown>): Record<string, unknown> {
  if (typeof object !== "object" || Array.isArray(object) || object === null) return object;

  const copied = JSON.parse(JSON.stringify(object)) as Record<string, unknown>;
  Object.entries(copied).forEach(([k, v]) => {
    if (Array.isArray(v) && v.length > 0) {
      copied[k] = v.map(removeEmpty);
    } else if (v === "" || v === undefined || v === null) {
      delete copied[k];
    } else if (typeof v === "object" && !Array.isArray(v)) {
      copied[k] = removeEmpty(v as Record<string, unknown>);
    }
  });
  return copied;
}

function isObject(o: unknown): boolean {
  return o === Object(o) && !Array.isArray(o) && typeof o !== "function";
}

function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace("-", "")
    .replace("_", ""));
}

function toSnake(s: string): string {
  // make snakecase work only on variables that do not start with $
  // or is not created at or updated at
  // as that breaks the strapi filters
  if (/^\$.*/.test(s) || s.includes("createdAt") || s.includes("updatedAt")) {
    return s;
  }
  return s.split(/(?=[A-Z])/).join("_").toLowerCase();
}

function objectKeysConverter(
  o: JsonLike,
  converter: (string)=> string,
): JsonLike {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        n[converter(k)] = objectKeysConverter(o[k], converter);
      });

    return n;
  } if (Array.isArray(o)) {
    return o.map((i) => objectKeysConverter(i, converter)) as JsonLike;
  }

  return o;
}

function objectValuesConverter(
  o: JsonLike | string,
  converter: (string)=> string,
): JsonLike | string {
  if (typeof o === "string") {
    return converter(o);
  } if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        n[k] = objectValuesConverter(o[k], converter);
      });

    return n;
  } if (Array.isArray(o)) {
    return o.map((i) => objectValuesConverter(i, converter)) as JsonLike;
  }

  return o;
}

export function keysToCamel(o: JsonLike): JsonLike {
  return objectKeysConverter(o, toCamel);
}

export function keysToSnake(o: JsonLike): JsonLike {
  return objectKeysConverter(o, toSnake);
}

export function valuesToSnake(o: JsonLike): JsonLike {
  return objectValuesConverter(o, toSnake);
}

// Cut an string into spaces
export function truncStr(str: string, max: number): string {
  if (str.length < max) return str;
  return `${str.substring(0, str.substring(0, max - 3).lastIndexOf(" "))} ...`;
}

export function stringifyObjectValues<T extends Record<string, JsonLike>>(obj: T): Stringify<T> {
  const stringified: Stringify<T> = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "number") {
        return [key, value.toString()];
      }
      return [key, value];
    }),
  ) as Stringify<T>;
  return stringified;
}

function capitalize(str: string): string {
  if (!str || str.length === 0) return "";
  return str[0].toUpperCase() + str.slice(1);
}
