import type { FooterNavBlock as NavigationBlockProps } from "@/payload-types";

import CMSLink from "@/components/ui/cms-link";

export default function Navigation({ title, links }: NavigationBlockProps) {
  return (
    <nav
      className="flex min-w-0 flex-col gap-3"
      aria-label={title ?? "Navigation"}
    >
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      <div className="flex flex-col items-start gap-2">
        {(links ?? []).map(({ id, link }, index) => (
          <CMSLink
            key={id ?? index}
            {...link}
            appearance="inline"
            className="text-muted-foreground transition-colors hover:text-foreground"
          />
        ))}
      </div>
    </nav>
  );
}
