import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

import type {
  Page,
  Blog,
  Media,
  SeoMedia,
  Redirect,
  SiteSetting,
  User,
  ArchiveBlock,
} from "@/payload-types";
import type { Form } from "@payloadcms/plugin-form-builder/types";

export enum CollectionName {
  blog = "blog",
  redirects = "redirects",
  pages = "pages",
}

export const AppConst = {
  CACHE_TAG_GENERAL: "general",
  CACHE_TAG_SITEMAP: "sitemap",
  POPUP_LAST_SHOWN_KEY: "POPUP_LAST_SHOWN_KEY",
} as const;

export type PropsSlug = { params: Promise<{ slug: string }> };

export type CardDocData = {
  relationTo: CollectionName;
  value:
    | Pick<Blog, "slug" | "meta" | "title">
    | Pick<Page, "slug" | "meta" | "title">;
};

export type ResolvedArchiveBlock = ArchiveBlock & { items: CardDocData[] };

export type ResolvedPageBlock =
  | Exclude<Page["layout"][number], { blockType: "archive" }>
  | ResolvedArchiveBlock;

export type ResolvedPage = Omit<Page, "layout"> & {
  layout: ResolvedPageBlock[];
};

export type MetaInput = {
  title: string;
  description: string;
  image: SeoMedia;
  path: string;
  modifiedTime?: string;
};

export type SitemapItem = { slug: string; updatedAt: string };

export type SitemapData = {
  [CollectionName.pages]: SitemapItem[];
  [CollectionName.blog]: SitemapItem[];
};

export type DalStatic = {
  queryCollection<T>(collection: CollectionName): Promise<T[]>;
  queryMediaByIds(ids: number[]): Promise<Media[]>;
  querySeoMediaByIds(ids: number[]): Promise<SeoMedia[]>;

  queryBlogBySlug(slug: string): Promise<Blog | null>;
  queryPageBySlug(slug: string): Promise<ResolvedPage | null>;
  queryRedirectByFrom(from: string): Promise<Redirect | null>;
  resolveRedirectDestination(from: string): Promise<string | null>;

  querySiteSettings(): Promise<SiteSetting>;
  querySitemapData(): Promise<SitemapData>;
  queryCurrentUser(req: Request): Promise<User | null>;
};

export type FormBlockProps = {
  id?: string;
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: Form;
  introContent?: DefaultTypedEditorState;
  submitUrl?: string;
  submitData?: Record<string, unknown>;
  refreshOnSubmit?: boolean;
};
