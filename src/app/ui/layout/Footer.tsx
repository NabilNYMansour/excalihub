"use client";

import { Divider, Flex, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export function Footer() {
  const currPath = usePathname();
  const user = useUser();

  if (/\/excalidraw/.test(currPath)) {
    return null;
  }

  return (
    <Flex direction="column" justify="center" align="center" pt="xl" pb="md">
      <Divider my="md" w="80%" />

      <Flex wrap="wrap" justify="center" w="80%" mb={10}>
        {user.isSignedIn &&
          <Link href='/' style={{ textDecoration: "none" }}>
            <Text fz="md" lh="md" mx="xs">
              Home
            </Text>
          </Link>
        }
        <Link href='/landing' style={{ textDecoration: "none" }}>
          <Text fz="md" lh="md" mx="xs">
            Landing
          </Text>
        </Link>

        <Link href='/landing#faq' style={{ textDecoration: "none" }}>
          <Text fz="md" lh="md" mx="xs">
            FAQ
          </Text>
        </Link>

        <Link href='/excalidraw' style={{ textDecoration: "none" }}>
          <Text fz="md" lh="md" mx="xs">
            Demo
          </Text>
        </Link>


        <Link href='/terms' style={{ textDecoration: "none" }}>
          <Text fz="md" lh="md" mx="xs">
            Terms
          </Text>
        </Link>
      </Flex>

      <Flex wrap="wrap" justify="center" w="80%">
        <Text fz="xs" lh="md">
          © Copyright {new Date().getFullYear()} ExcaliHub
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