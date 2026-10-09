import type { FooterIconsBlock as IconsBlockProps } from "@/payload-types";

import CMSLink from "@/components/ui/cms-link";
import { cn } from "@/lib/core/utilities";

type IconItem = NonNullable<IconsBlockProps["items"]>[number];
type IconColor = NonNullable<IconItem["color"]>;

const iconColorClasses: Record<IconColor, string> = {
  neutral: "border-border bg-card text-foreground hover:bg-muted",
  black:
    "border-neutral-300 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300 dark:hover:bg-neutral-900/70",
  blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70",
  green:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70",
  rose: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70",
  amber:
    "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70",
  violet:
    "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-950/70",
};

export default function Icons({ title, items }: IconsBlockProps) {
  if (!items?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {title ? <h2 className="text-sm font-semibold">{title}</h2> : null}
      <div className="flex flex-wrap items-center gap-2">
        {items.map(({ id, svg, color, link }, index) => (
          <CMSLink
            key={id ?? index}
            {...link}
            label=""
            appearance="inline"
            className={cn("icon-button", iconColorClasses[color ?? "neutral"])}
          >
            <svg
              aria-hidden="true"
              className="size-5 fill-current"
              viewBox={svg.viewBox}
            >
              <path d={svg.path} />
            </svg>
            <span className="sr-only">{link.label}</span>
          </CMSLink>
        ))}
      </div>
    </div>
  );
}
