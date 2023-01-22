import { validEmail } from "./loginFunctions";

it("Should return if email is valid ", () => {
  expect(validEmail("email@email.com")).toEqual(true);
  expect(validEmail("emailemail.com")).toEqual("Digite um email válido");
});
