import {
  unflatten, extractSelectValue, removeEmpty, keysToCamel, keysToSnake,
} from "./utils";

test("Should unflatten array of string", () => {
  const flattened = {
    "cust.address": "",
    "cust.birth": "",
    "cust.cep": "",
    "cust.civilStatus": null,
    "cust.company": "",
    "cust.cpf": "",
    "cust.email": "",
    "cust.extra_email": "",
    "cust.extra_phone": "",
    "cust.firstName": "",
    "cust.gender": null,
    "cust.lastName": "",
    "cust.nickname": "",
    "cust.occupation": "",
    "cust.phone": "",
    "dependents.0.birth": "",
    "dependents.0.cpf": "",
    "dependents.0.firstName": "",
    "dependents.0.isClient": null,
    "dependents.0.kinship": null,
    "dependents.0.lastName": "",
    "dependents.0.nickname": "",
  };

  expect(unflatten(flattened)).toEqual({
    cust: {
      address: "",
      birth: "",
      cep: "",
      civilStatus: null,
      company: "",
      cpf: "",
      email: "",
      extra_email: "",
      extra_phone: "",
      firstName: "",
      gender: null,
      lastName: "",
      nickname: "",
      occupation: "",
      phone: "",
    },
    dependents: [{
      birth: "",
      cpf: "",
      firstName: "",
      isClient: null,
      kinship: null,
      lastName: "",
      nickname: "",
    }],
  });
});

describe("Select value extractor", () => {
  test("Should resolve single select values", () => {
    const flattened = {
      "cust.gender": { text: "Masculino", value: "male" },
      "cust.foo": null,
      "cust.boolean": { text: "falso", value: false },
    };

    expect(extractSelectValue(flattened)).toEqual({
      "cust.gender": "male",
      "cust.foo": null,
      "cust.boolean": false,
    });
  });

  test("Should resolve multiple select values", () => {
    const flattened = {
      "cust.gender": [
        { text: "Masculino", value: "male" },
        { text: "Feminino", value: "female" },
      ],
      "cust.boolean": [
        { text: "Verdadeiro", value: true },
        { text: "False", value: false },
      ],
      "cust.foo": null,
    };
    expect(extractSelectValue(flattened)).toEqual({
      "cust.gender": ["male", "female"],
      "cust.boolean": [true, false],
      "cust.foo": null,
    });
  });
});

test("Should remove empty key from object", () => {
  const obj = {
    address: "",
    birth: "1212-12-12",
    cep: "",
    cpf: "12121212121",
    email: "asdfasdf@live.com",
    first_name: "Jose",
    gender: null,
    last_name: "nogueira",
    nickname: "",
    occupation: "",
    password: "abcd.12",
    phone: "61981652945",
    second_email: "",
    second_phone: "",
    username: "asfdasdf@live.com",
    arr: ["full", ""],
    arrObj: [{
      key: "",
      ke2: "teste",
    }],
    secondLayer: {
      address: "",
      birth: "1212-12-12",
      cep: "",
      cpf: "12121212121",
      email: "asdfasdf@live.com",
      first_name: "Jose",
      gender: null,
      last_name: "nogueira",
      nickname: "",
      occupation: "",
      password: "abcd.12",
      phone: "61981652945",
      second_email: "",
      second_phone: "",
      username: "asfdasdf@live.com",
    },
  };

  expect(removeEmpty(obj)).toEqual({
    birth: "1212-12-12",
    cpf: "12121212121",
    email: "asdfasdf@live.com",
    first_name: "Jose",
    last_name: "nogueira",
    password: "abcd.12",
    phone: "61981652945",
    username: "asfdasdf@live.com",
    arr: ["full", ""],
    arrObj: [{
      ke2: "teste",
    }],
    secondLayer: {
      birth: "1212-12-12",
      cpf: "12121212121",
      email: "asdfasdf@live.com",
      first_name: "Jose",
      last_name: "nogueira",
      password: "abcd.12",
      phone: "61981652945",
      username: "asfdasdf@live.com",
    },
  });
});

describe("Object keys converter", () => {
  let snakeCaseObj: JsonLike;
  let camelCaseObj: JsonLike;

  beforeEach(() => {
    snakeCaseObj = {
      best_chili: {
        chili_ingredients: [
          "beef",
          "dried chilis",
          "fresh tomatoes",
          "cumin",
          "onions",
          "onion-powder",
          "peppers",
        ],
        chili_steps: {
          step_1: "",
          step_2: "",
        },
      },
      serves: 6,
      pairs_with: [
        {
          french_bread: {},
        },
        {
          rye_croutons: {},
        },
      ],
    };

    camelCaseObj = {
      bestChili: {
        chiliIngredients: [
          "beef",
          "dried chilis",
          "fresh tomatoes",
          "cumin",
          "onions",
          "onion-powder",
          "peppers",
        ],
        chiliSteps: {
          step_1: "",
          step_2: "",
        },
      },
      serves: 6,
      pairsWith: [
        {
          frenchBread: {},
        },
        {
          ryeCroutons: {},
        },
      ],
    };
  });

  test("Should convert object keys to camelCase", () => {
    expect(keysToCamel(snakeCaseObj)).toEqual(camelCaseObj);
  });

  test("Should convert object keys to snake_case", () => {
    expect(keysToSnake(camelCaseObj)).toEqual(snakeCaseObj);
  });
});
