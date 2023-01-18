import type { ArgType } from "@storybook/addons";
import Card from "./Card.svelte";
import CardWrapper from "./CardWrapper.svelte";

export default {
  title: "Components/Card",
  component: Card,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: CardWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  headerHtml: "",
});

export const Slotted = Template({
  headerHtml: "",
  bodySlotted: true,
});

export const WithTitle = Template({
  headerHtml: "",
  title: "Cool list",
  bodySlotted: true,
});

export const WithHeader = Template({
  title: "Cool list",
});
