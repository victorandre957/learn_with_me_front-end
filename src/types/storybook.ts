export type TArgType = {
  name?: string,
  type?: {
    name?: string,
    required?: boolean,
  },
  defaultValue?: string,
  description?: string,
  table?: {
    type?: { summary?: string, detail?: string },
    defaultValue?: { summary?: string, detail?: string },
  },
  control?: {
    type: "object" |
      "boolean" |
      "radio" | "inline-radio" | "check" | "inline-check" | "select" | "multi-select" |
      "text" |
      "date"
  } | {
    type: "number" | "range",
    min?: number,
    max?: number,
    step?: number,
  } | {
    type: "file",
    accept?: unknown,
  } | {
    type: "color",
    presetColors?: unknown,
  },
};
