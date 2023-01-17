import { render } from "@testing-library/svelte";
import MyComponent from "./MyComponent.svelte";

test("Should render env variables", () => {
  const { getByTestId } = render(MyComponent, {
  });
  const containerEl = getByTestId("env-container");
  expect(containerEl.textContent).toContain("MY_ENV_VARIABLE");
  expect(containerEl.textContent).toContain("NODE_ENV:test");
});
