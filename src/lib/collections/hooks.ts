import { revalidateTag } from "next/cache";

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { AppConst, CollectionName } from "@/lib/core/types/types";
import { getRevalidateTag } from "@/lib/core/utilities";

export const revalidate = (tag: string) => {
  revalidateTag(getRevalidateTag(tag), "max");
};

export const makeRevalidateHooks = (
  collection: CollectionName,
): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} => {
  return {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const newSlug = doc?.slug ? String(doc.slug) : "";
        if (!newSlug) return doc;

        const prevSlug = previousDoc?.slug ? String(previousDoc.slug) : "";

        try {
          if (prevSlug && prevSlug !== newSlug) {
            revalidate(`${collection}-${prevSlug}`);
          }

          revalidate(`${collection}-${newSlug}`);
          revalidate(AppConst.CACHE_TAG_SITEMAP);
        } catch {}

        return doc;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const slug = doc?.slug ? String(doc.slug) : "";
        if (!slug) return doc;

        try {
          revalidate(`${collection}-${slug}`);
          revalidate(AppConst.CACHE_TAG_SITEMAP);
        } catch {}

        return doc;
      },
    ],
  };
};

const revalidateRedirect = (from: string) => {
  revalidate(`${CollectionName.redirects}-${from}`);
};

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  try {
    revalidateRedirect(doc.from);

    if (previousDoc?.from && previousDoc.from !== doc.from) {
      revalidateRedirect(previousDoc.from);
    }
  } catch {}

  return doc;
};

export const revalidateDeleteRedirects: CollectionAfterDeleteHook = ({
  doc,
}) => {
  try {
    revalidateRedirect(doc.from);
  } catch {}
  return doc;
};
