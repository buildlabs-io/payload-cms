import type { CollectionConfig, PayloadRequest } from "payload";

import { adminOnlyAccess } from "@/lib/collections/fields/base-fields";
import { revalidate } from "@/lib/collections/hooks";
import { CollectionName } from "@/lib/core/types/types";

const revalidateBlogFromComment = async (
  doc: { blog?: number | { id?: number } | null },
  req: PayloadRequest,
) => {
  const blogId = typeof doc.blog === "object" ? doc.blog?.id : doc.blog;
  if (!blogId) return;

  try {
    const blog = await req.payload.findByID({
      collection: CollectionName.blog,
      id: blogId,
      depth: 0,
      select: { slug: true },
    });
    revalidate(`${CollectionName.blog}-${blog.slug}`);
  } catch {}
};

export const BlogComments: CollectionConfig = {
  slug: "blog-comments",
  labels: {
    singular: "Blog Comment",
    plural: "Blog Comments",
  },
  access: {
    ...adminOnlyAccess,
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await revalidateBlogFromComment(doc, req);
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await revalidateBlogFromComment(doc, req);
      },
    ],
  },
  admin: {
    useAsTitle: "authorName",
    group: "Content",
    defaultColumns: ["authorName", "blog", "createdAt"],
  },
  fields: [
    {
      name: "blog",
      type: "relationship",
      relationTo: CollectionName.blog,
      required: true,
      index: true,
    },
    {
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "authorEmail",
      type: "email",
      access: {
        read: ({ req }) => Boolean(req.user),
      },
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
  ],
};
