"use client";

import { SignIn } from "@clerk/nextjs";
import { useComputedColorScheme } from "@mantine/core";
import { dark } from "@clerk/themes";
import CenterContainer from "@/app/ui/components/other/CenterContainer";

export default function Page() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return <CenterContainer>
    <SignIn appearance={{ baseTheme: computedColorScheme === "dark" ? dark : undefined }} />
  </CenterContainer>
}