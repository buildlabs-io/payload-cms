import type { SiteSetting } from "@/payload-types";

import RenderBlocks from "@/components/blocks/render-blocks";

export default function Footer({ footer }: { footer: SiteSetting["footer"] }) {
  return (
    <footer className="mt-auto  p-4">
      <div className="container border-t pt-4 border-foreground/30 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 [&>div]:col-span-full [&>div[data-block-type=footerNav]]:col-span-1 [&_.container]:max-w-none [&_.container]:px-0">
        <RenderBlocks blocks={footer?.blocks ?? []} isPage={false} />
      </div>
    </footer>
  );
}
