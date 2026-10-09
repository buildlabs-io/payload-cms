import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import CMSLink from "@/components/ui/cms-link";
import RichText from "@/components/ui/rich-text";
import { cn } from "@/lib/core/utilities";

const columnClasses = {
  full: "col-span-4 lg:col-span-12",
  half: "col-span-4 md:col-span-2 lg:col-span-6",
  oneThird: "col-span-4 md:col-span-2 lg:col-span-4",
  twoThirds: "col-span-4 md:col-span-2 lg:col-span-8",
};

export default function ContentBlock({
  columns,
  enableGutter = true,
}: ContentBlockProps & { enableGutter?: boolean }) {
  return (
    <div className={cn("my-2", enableGutter && "container")}>
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns?.map((col, index) => (
          <div key={index} className={columnClasses[col.size ?? "oneThird"]}>
            {col.richText && (
              <RichText data={col.richText} enableGutter={false} />
            )}

            {col.enableLink && col.link && <CMSLink {...col.link} />}
          </div>
        ))}
      </div>
    </div>
  );
}
