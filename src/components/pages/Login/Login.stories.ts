import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Login from "./Login.svelte";

export default {
  title: "Pages/Login",
  component: Login,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Login,
    props,
    on: {
      submit: action("on:submit"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
