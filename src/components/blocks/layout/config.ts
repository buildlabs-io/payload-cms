import type { Block, Field } from "payload";

import { Banner } from "@/components/blocks/Banner/config";
import { Content } from "@/components/blocks/Content/config";
import { MediaBlock } from "@/components/blocks/MediaBlock/config";
import { link } from "@/lib/collections/fields/link";

const iconColors = [
  { label: "Neutral", value: "neutral" },
  { label: "Black", value: "black" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Rose", value: "rose" },
  { label: "Amber", value: "amber" },
  { label: "Violet", value: "violet" },
];

const iconItemFields: Field[] = [
  {
    name: "svg",
    type: "group",
    required: true,
    fields: [
      { name: "viewBox", type: "text", required: true },
      { name: "path", type: "textarea", required: true },
    ],
  },
  {
    name: "color",
    type: "select",
    defaultValue: "neutral",
    options: iconColors,
  },
  { name: "social", label: "Social profile", type: "checkbox" },
  link({ appearances: false }),
];

const Navigation: Block = {
  slug: "footerNav",
  interfaceName: "FooterNavBlock",
  labels: { singular: "Navigation", plural: "Navigation" },
  fields: [
    { name: "title", type: "text" },
    {
      name: "links",
      type: "array",
      maxRows: 10,
      fields: [link({ appearances: false })],
    },
  ],
};

const makeIconsBlock = (
  slug: "footerIcons" | "headerIcons",
  interfaceName: "FooterIconsBlock" | "HeaderIconsBlock",
): Block => ({
  slug,
  interfaceName,
  labels: { singular: "Icons", plural: "Icons" },
  fields: [
    { name: "title", type: "text" },
    { name: "items", type: "array", maxRows: 10, fields: iconItemFields },
  ],
});

const ThemeToggle: Block = {
  slug: "themeToggle",
  interfaceName: "ThemeToggleBlock",
  labels: { singular: "Theme button", plural: "Theme buttons" },
  fields: [],
};

const sharedBlocks = [Navigation, Content, MediaBlock, Banner, ThemeToggle];

export const headerBlocks = [
  makeIconsBlock("headerIcons", "HeaderIconsBlock"),
  ...sharedBlocks,
];

export const footerBlocks = [
  makeIconsBlock("footerIcons", "FooterIconsBlock"),
  ...sharedBlocks,
];
