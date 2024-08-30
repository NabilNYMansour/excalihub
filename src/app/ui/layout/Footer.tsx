"use client";

import { Anchor, Divider, Flex, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Footer() {
  const currPath = usePathname();

  if (/\/excalidraw/.test(currPath)) {
    return null;
  }

  return (
    <Flex direction="column" justify="center" align="center" pt="xl" pb="md">
      <Divider my="md" w="80%" />

      <Flex wrap="wrap" justify="center" w="80%">
        <Link href='/landing' style={{ textDecoration: "none" }}>
          <Text fz="xs" lh="md" mx="xs">
            Landing
          </Text>
        </Link>

        <Link href='/excalidraw' style={{ textDecoration: "none" }}>
          <Text fz="xs" lh="md" mx="xs">
          Demo
          </Text>
        </Link>


        <Link href='/terms' style={{ textDecoration: "none" }}>
          <Text fz="xs" lh="md" mx="xs">
            Terms
          </Text>
        </Link>

        <Divider orientation="vertical" mx="sm" />

        <Text fz="xs" lh="md">
          © Copyright {new Date().getFullYear()} ExcaliHub.
        </Text>

        <Divider orientation="vertical" mx="sm" />

        <Text fz="xs" lh="md">Developed by &nbsp;</Text>

        <Link href="https://nabilmansour.com/" target="_blank" style={{ textDecoration: "none" }}>
          <Text fz="xs" lh="md">
            Nabil Mansour
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}