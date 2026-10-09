"use client";

import dynamic from "next/dynamic";

export const AutoScrollRow = dynamic(
  () =>
    import("@/components/shared/elements-client").then(
      (module) => module.AutoScrollRowClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex gap-4 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="carousel-item animate-pulse" key={index}>
            <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
              <div className="aspect-[3/2] bg-muted" />
              <div className="space-y-2 p-4">
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
);

export const ThemeSelector = dynamic(
  () =>
    import("@/components/shared/elements-client").then(
      (m) => m.ThemeSelectorClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="icon-button theme-toggle animate-pulse"
      />
    ),
  },
);

export const HeaderClientWrapper = dynamic(
  () => import("@/components/layout/header-client"),
  {
    ssr: false,
  },
);

export const FormBlockWrapper = dynamic(
  () => import("@/components/blocks/Form/component-client"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full mx-auto max-w-lg animate-pulse space-y-5">
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-20 bg-gray-300 rounded" />
        <div className="h-10 w-32 bg-gray-300 rounded" />
      </div>
    ),
  },
);
