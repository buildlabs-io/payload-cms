import type { Field } from "payload";

import { BASE_RICH_TEXT } from "@/lib/collections/fields/base-fields";
import { linkGroup } from "@/lib/collections/fields/linkGroup";

export const pageHero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
      ],
      required: true,
    },
    {
      ...BASE_RICH_TEXT,
      label: false,
    } as Field,

    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) =>
          ["highImpact", "mediumImpact"].includes(type),
      },
      relationTo: "media",
      required: false,
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { type?: string } },
      ) =>
        !["highImpact", "mediumImpact"].includes(siblingData?.type ?? "") ||
        Boolean(value) ||
        "Hero image is required for high and medium impact heroes.",
    },
  ],
  label: false,
};
