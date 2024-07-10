"use client";

import { Skeleton, useComputedColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import { initialLandingExcaliData as initData } from "./Constants";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

export default function LandingExcalidraw() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <div style={{ width: "100%", height: "50vh", borderRadius: "12px", overflow: "hidden" }}>
      <Excalidraw theme={computedColorScheme}
        UIOptions={{ tools: { image: false } }}
        initialData={{
          elements: initData.elements as any,
          scrollToContent: true,
        }} gridModeEnabled zenModeEnabled viewModeEnabled />
    </div>
  );
} 