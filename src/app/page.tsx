import { Flex } from '@mantine/core';
import { FeaturesCards } from './ui/components/landing/FeaturesCards';
import LandingHero from './ui/components/landing/LandingHero';
import Faq from './ui/components/landing/Faq';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return <Flex direction="column" w="100%" align="center">

    <Flex wrap="wrap" w="100%" mih={900} justify="center" align="center">
      <LandingHero />
      <Link href="/excalidraw">
        <Image
          src="/landing.png"
          alt="Landing"
          width={1000}
          height={650}
          style={{ borderRadius: "2.0rem", marginTop: "25px", maxWidth: "100%", height: "auto", padding: "20px" }}
        />
      </Link>
    </Flex>

    <Flex bg="var(--mantine-color-main-light)"
      wrap="wrap" w="100%" justify="center" align="center">
      <FeaturesCards />
    </Flex>

    <Flex wrap="wrap" w="100%" justify="center" align="center" id='faq'>
      <Faq />
    </Flex>
  </Flex>
};

export default Page;