import type { GlobalConfig } from "payload";

import { RichTextBlock } from "@/components/blocks/Content/config";
import { HtmlEmbed } from "@/components/blocks/HtmlEmbed/config";
import { footerBlocks, headerBlocks } from "@/components/blocks/layout/config";
import { adminOnlyAccess } from "@/lib/collections/fields/base-fields";
import { link } from "@/lib/collections/fields/link";
import { revalidate } from "@/lib/collections/hooks";
import { AppConst } from "@/lib/core/types/types";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    ...adminOnlyAccess,
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "general",
          label: "General",
          fields: [
            {
              name: "logo",
              label: "Logo",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          label: "Popup",
          name: "popup",
          fields: [
            {
              name: "delaySeconds",
              label: "Delay Seconds",
              type: "number",
              defaultValue: 0,
              required: true,
              min: 0,
            },
            {
              name: "repeatDays",
              label: "Repeat Days",
              type: "number",
              defaultValue: 0,
              required: true,
              min: 0,
            },
            {
              name: "content",
              label: "Content",
              type: "blocks",
              blocks: [HtmlEmbed, RichTextBlock],
            },
          ],
        },
        {
          name: "header",
          label: "Header",
          fields: [
            {
              name: "blocks",
              label: "Header blocks",
              type: "blocks",
              blocks: headerBlocks,
              admin: { initCollapsed: true },
            },
            {
              name: "navItems",
              type: "array",
              maxRows: 6,
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
        {
          name: "footer",
          label: "Footer",
          fields: [
            {
              name: "blocks",
              label: "Footer blocks",
              type: "blocks",
              blocks: footerBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          revalidate(AppConst.CACHE_TAG_GENERAL);
        } catch {}
        return doc;
      },
    ],
  },
};
