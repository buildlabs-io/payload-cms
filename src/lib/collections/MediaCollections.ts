import { randomBytes } from "node:crypto";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type {
  CollectionConfig,
  ImageSize,
  ImageUploadFormatOptions,
} from "payload";

import { adminOnlyAccess } from "@/lib/collections/fields/base-fields";
import appConfig from "@/lib/core/config";

const PUBLIC_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../public/images",
);

const makeMediaCollection = ({
  slug,
  labels,
  description,
  imageSizes,
}: {
  slug: string;
  labels?: CollectionConfig["labels"];
  description?: string;
  imageSizes?: ImageSize[];
}): CollectionConfig => {
  const uploadBase = {
    focalPoint: true,
    formatOptions: {
      format: "webp",
      options: { quality: 85, effort: 6 },
    } as ImageUploadFormatOptions,
    ...(imageSizes ? { imageSizes } : {}),
  };

  return {
    slug,
    ...(labels ? { labels } : {}),
    admin: {
      group: "Content",
      ...(description ? { description } : {}),
    },
    access: {
      ...adminOnlyAccess,
      read: () => true,
    },
    hooks: {
      beforeOperation: [
        ({ req, operation }) => {
          if ((operation === "create" || operation === "update") && req.file) {
            req.file.name = `${randomBytes(6).toString("hex")}${extname(req.file.name).toLowerCase()}`;
          }
        },
      ],
    },
    fields: [
      {
        name: "alt",
        type: "text",
        required: true,
      },
    ],
    upload: appConfig.STORAGE_PROVIDER
      ? uploadBase
      : {
          staticDir: join(PUBLIC_DIR, slug),
          ...uploadBase,
        },
  };
};

// Generic uploads used by heroes and content blocks.
export const Media: CollectionConfig = makeMediaCollection({
  slug: "media",
});

export const SeoMedia: CollectionConfig = makeMediaCollection({
  slug: "seo-media",
  labels: {
    singular: "SEO Image",
    plural: "SEO Media",
  },
  description:
    "Images for the SEO tab (social sharing + listing cards). Use the Media collection instead for hero, gallery, or content images.",
  imageSizes: [
    {
      name: "card",
      width: 360,
      height: 360,
      fit: "cover",
      withoutEnlargement: true,
      formatOptions: { format: "webp", options: { quality: 75 } },
    },
    {
      name: "og",
      width: 1200,
      height: 630,
      fit: "contain",
      background: "#f4f4f5",
      withoutEnlargement: false,
      formatOptions: { format: "webp", options: { quality: 82 } },
    },
  ],
});

export const GalleryMedia: CollectionConfig = makeMediaCollection({
  slug: "gallery-media",
  labels: {
    singular: "Gallery Image",
    plural: "Gallery Media",
  },
  description:
    "Images for the Gallery block. Use the Media collection instead for hero or content-block images.",
  imageSizes: [
    {
      name: "gallery",
      width: 450,
      height: 600,
      fit: "cover",
      withoutEnlargement: false,
      formatOptions: { format: "webp", options: { quality: 85 } },
    },
  ],
});
