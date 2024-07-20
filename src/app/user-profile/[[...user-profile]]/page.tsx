"use client";

import { UserProfile } from "@clerk/nextjs";
import { useComputedColorScheme } from "@mantine/core";
import { dark } from "@clerk/themes";
import CenterContainer from "@/app/ui/components/other/CenterContainer";

export default function Page() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return <CenterContainer>
    <UserProfile appearance={{ baseTheme: computedColorScheme === "dark" ? dark : undefined }} />
  </CenterContainer>
}