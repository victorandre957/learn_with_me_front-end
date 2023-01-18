import { isFalsy, isTruthy, isEmpty } from "./truthy";

test("verifcar se a informação existe", () => {
  const values = {
    name: "",
    cpf: "00000000000",
  };

  expect(isTruthy(values.name)).toEqual(false);
  expect(isTruthy(values.cpf)).toEqual(true);
});

test("verifcar se a informação não existe", () => {
  const values = {
    name: "",
    cpf: "00000000000",
  };

  expect(isFalsy(values.name)).toEqual(true);
  expect(isFalsy(values.cpf)).toEqual(false);
});

test("verifcar se o array existe", () => {
  const values = undefined;
  const values2 = ["hello"];

  expect(isEmpty(values)).toEqual(true);
  expect(isEmpty(values2)).toEqual(false);
});
