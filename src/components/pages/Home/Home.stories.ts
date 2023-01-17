import type { ArgType } from "@storybook/addons";
import Home from "./Home.svelte";

export default {
  title: "Pages/Home",
  component: Home,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Home,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
