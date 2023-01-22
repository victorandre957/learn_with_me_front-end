import type { ArgType } from "@storybook/addons";
import Login from "./Login.svelte";

export default {
  title: "Pages/Login",
  component: Login,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Login,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
