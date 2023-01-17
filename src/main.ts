import "szot-ui-experimental/src/styles/global.scss";
import "./styles/global.scss";

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {},
});

export default app;
