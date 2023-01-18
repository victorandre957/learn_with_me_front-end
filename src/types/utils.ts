export type Stringify<T extends Record<string, JsonLike>> = {
  [Property in keyof T]: T[Property] extends number ? string : T[Property];
};
