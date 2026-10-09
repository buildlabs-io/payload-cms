import Link from "next/link";

import type { ResolvedPage } from "@/lib/core/types/types";
import type { Blog, Media } from "@/payload-types";

import ImageVideo from "@/components/ui/image-video";
import { CollectionName } from "@/lib/core/types/types";
import { createJsonLdByModel } from "@/lib/seo/jsonld";

export const Logo = ({ resource }: { resource: Media }) => {
  return (
    <Link href="/">
      <ImageVideo
        resource={resource}
        imgClassName="w-auto max-w-[9rem] object-contain h-8"
      />
    </Link>
  );
};

export const JsonLd = ({ data }: { data: unknown }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026"),
    }}
  />
);

type JsonLdViewScriptProps =
  | { collection: CollectionName.pages; entity: ResolvedPage }
  | { collection: CollectionName.blog; entity: Blog };

export const JsonLdViewScript = ({
  collection,
  entity,
}: JsonLdViewScriptProps) => (
  <JsonLd data={createJsonLdByModel(collection, entity)} />
);
