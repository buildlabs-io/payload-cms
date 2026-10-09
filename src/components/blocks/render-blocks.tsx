import type { ResolvedPageBlock } from "@/lib/core/types/types";
import type { Page, SiteSetting } from "@/payload-types";

import { ArchiveBlock } from "@/components/blocks/ArchiveBlock/Component";
import { BannerBlock } from "@/components/blocks/Banner/Component";
import { CallToActionBlock } from "@/components/blocks/CallToAction/Component";
import ContentBlock from "@/components/blocks/Content/Component";
import FaqBlock from "@/components/blocks/Faqs/Component";
import FormBlock from "@/components/blocks/Form/component";
import GalleryBlock from "@/components/blocks/Gallery/Component";
import HtmlEmbedBlock from "@/components/blocks/HtmlEmbed/Component";
import Icons from "@/components/blocks/layout/icons";
import Navigation from "@/components/blocks/layout/nav";
import { MediaBlock } from "@/components/blocks/MediaBlock/Component";
import { ThemeSelector } from "@/components/shared/wrappers";
import RichText from "@/components/ui/rich-text";

type FooterBlock = NonNullable<
  NonNullable<SiteSetting["footer"]>["blocks"]
>[number];
type HeaderBlock = NonNullable<
  NonNullable<SiteSetting["header"]>["blocks"]
>[number];

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: GalleryBlock,
  faqs: FaqBlock,
  htmlEmbed: HtmlEmbedBlock,
  richText: ({
    content,
  }: {
    content: Page["layout"][0] extends infer T
      ? T extends { content?: infer C }
        ? C
        : never
      : never;
  }) => (
    <div className="container">
      <RichText data={content} />
    </div>
  ),
  banner: BannerBlock,
  footerIcons: Icons,
  footerNav: Navigation,
  headerIcons: Icons,
  themeToggle: ThemeSelector,
};

export default function RenderBlocks({
  blocks,
  isPage = true,
}: {
  blocks: ResolvedPageBlock[] | FooterBlock[] | HeaderBlock[];
  isPage?: boolean;
}) {
  if (!blocks?.length) return null;
  return blocks.map((block, index) => {
    const { blockType } = block;

    if (!blockType || !(blockType in blockComponents)) return null;

    const Block = blockComponents[blockType];
    return (
      <div
        className={isPage ? "my-2" : undefined}
        data-block-type={blockType}
        key={block.id ?? index}
      >
        {/* @ts-expect-error dynamic block props union */}
        <Block {...block} />
      </div>
    );
  });
}
