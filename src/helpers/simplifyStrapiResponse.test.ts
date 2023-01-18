import simplifyStrapiResponse from "./simplifyStrapiResponse";

describe("Simplify Strapi Response", () => {
  const testObj1 = {
    num1: 1,
    num2: 0,
    str: "ué",
    bool1: true,
    bool2: false,
    arr: ["a", 1, true],
    hue: undefined,
    huehue: null,
  };

  test("Keeps non object elements the same", () => {
    const res = simplifyStrapiResponse(testObj1);

    expect(res).toEqual(testObj1);
  });

  ["attributes", "data"].forEach((notAllowed) => {
    test(`Removes "${notAllowed}" from the object`, () => {
      const obj1 = {
        id: 69,
        [notAllowed]: testObj1,
      };

      let res = simplifyStrapiResponse(obj1);

      expect(res).toEqual({ id: 69, ...testObj1 });

      const obj2 = {
        [notAllowed]: testObj1.arr,
      };

      res = simplifyStrapiResponse(obj2);

      expect(res).toEqual(testObj1.arr);
    });

    test(`Doesn't remove "${notAllowed}" when not possible`, () => {
      const obj1 = {
        meta: {},
        [notAllowed]: testObj1.arr,
      };

      const res = simplifyStrapiResponse(obj1);

      expect(res).toEqual(obj1);
    });
  });
});
