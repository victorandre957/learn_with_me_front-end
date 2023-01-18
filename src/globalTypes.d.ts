type Keys = string | number | symbol;
type JsonKeys = string | number;
type JsonValues = string | boolean | number | undefined | null;
type ValueOrRecordOrArray<K extends Keys, T> = T
  | Array<ValueOrRecordOrArray<K, T>>
  | {
    [P in K]: ValueOrRecordOrArray<K, T>
  }
declare type JsonLike = ValueOrRecordOrArray<JsonKeys, JsonValues>;
declare type ObjectLike = ValueOrRecordOrArray<Keys, JsonValues>;
