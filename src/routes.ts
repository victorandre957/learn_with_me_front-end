import { wrap } from "svelte-spa-router/wrap";
import type { ConditionsFailedEvent } from "svelte-spa-router";
import { replace } from "svelte-spa-router";

import Home from "./components/pages/Home/Home.svelte";
import NotFound from "./components/pages/NotFound/NotFound.svelte";

const routes = new Map();

routes.set("/", wrap({
  component: Home,
}));

routes.set("*", NotFound);

export default routes;

/**
 * On some condition fail this function will be trigged, performing routes change
 */
export function conditionsFailHandler(
  event: ConditionsFailedEvent,
): void {
  const { route } = event.detail;
}
