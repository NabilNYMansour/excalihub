"use client";

import { Button, Flex, Text } from '@mantine/core';
import { RiLinkM } from 'react-icons/ri';
import { useMediaQuery } from '@mantine/hooks';
import { Skeleton, useComputedColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import classes from './page.module.css';
import { WELCOME_EXCALI_DATA } from '@/lib/constants';
import { FeaturesCards } from '../ui/components/landing/FeaturesCards';
import LandingHero from '../ui/components/landing/LandingHero';
import Faq from '../ui/components/landing/Faq';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

function LandingExcalidraw() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isSmallScreen = useMediaQuery('(max-width: 1300px)');

  return (
    <Flex direction="column" justify="center" align="stretch"
      w={700} p={20}>
      <div
        className={classes.drawing}
        style={{ width: "100%", height: isSmallScreen ? 300 : 600, borderRadius: "12px", overflow: "hidden", marginTop: "25px" }}>
        <Excalidraw theme={computedColorScheme}
          UIOptions={{ tools: { image: false } }}
          initialData={{
            elements: WELCOME_EXCALI_DATA.elements as any,
            scrollToContent: true,
            appState: { zoom: { value: (isSmallScreen ? .5 : 1) as any } }
          }} zenModeEnabled />
      </div>
    </Flex>
  );
}

const Page = () => {
  return <Flex direction="column" w="100%" align="center">
    <Flex wrap="wrap" w="100%" mih={900} justify="center" align="center">
      <LandingHero />
      <LandingExcalidraw />
    </Flex>

    <Flex bg="var(--mantine-color-main-light)"
      wrap="wrap" w="100%" justify="center" align="center">
      <FeaturesCards />
    </Flex>

    <Flex wrap="wrap" w="100%" justify="center" align="center">
      <Faq />
    </Flex>

  </Flex>
};

export default Page;