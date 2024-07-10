"use client";

import { SignIn } from "@clerk/nextjs";
import { Container, useComputedColorScheme } from "@mantine/core";
import globalClasses from "@/app/globals.module.css";
import { dark } from "@clerk/themes";

export default function Page() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return <Container size="lg" className={globalClasses.centerContainer}>
    <SignIn appearance={{ baseTheme: computedColorScheme === "dark" ? dark : undefined }} />
  </Container>
}