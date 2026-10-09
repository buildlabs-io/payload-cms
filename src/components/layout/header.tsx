import { draftMode } from "next/headers";

import type { Media, SiteSetting } from "@/payload-types";

import RenderBlocks from "@/components/blocks/render-blocks";
import { Logo } from "@/components/shared/elements-ssr";
import { HeaderClientWrapper } from "@/components/shared/wrappers";
import CMSLink from "@/components/ui/cms-link";

export default async function Header({ settings }: { settings: SiteSetting }) {
  const { isEnabled } = await draftMode();
  const { general, header, popup } = settings;

  return (
    <>
      <div className="sticky top-0 z-50">
        <HeaderClientWrapper
          preview={isEnabled}
          navItems={header?.navItems ?? []}
          popup={popup}
          popupContent={
            popup?.content?.length ? (
              <RenderBlocks blocks={popup.content} isPage={false} />
            ) : null
          }
        />
        <header className="border-b border-border bg-background">
          <div className="container flex items-center justify-between py-2">
            <nav className="hidden items-center gap-3 lg:flex">
              {(header?.navItems ?? []).map(({ link }, index) => (
                <CMSLink key={index} {...link} appearance="link" />
              ))}
            </nav>

            <div aria-hidden className="w-5 lg:hidden" />

            <Logo resource={general.logo as Media} />

            <div className="flex shrink-0 items-center gap-3 md:gap-4">
              <RenderBlocks blocks={header?.blocks ?? []} isPage={false} />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
