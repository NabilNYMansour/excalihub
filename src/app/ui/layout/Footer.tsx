"use client";

import { Divider, Flex, Text } from '@mantine/core';
import classes from './Footer.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Footer() {
  const currPath = usePathname();

  if (/\/excalidraw/.test(currPath)) {
    return null;
  }

  return (
    <div className={classes.footer}>
      <Flex direction="column" justify="center" align="center">
        <Flex gap={10}>
          <Link href='/' style={{ color: "inherit" }}>
            <Text fz="lg" lh="md">
              Home
            </Text>
          </Link>
          <Link href='/landing' style={{ color: "inherit" }}>
            <Text fz="lg" lh="md">
              Landing
            </Text>
          </Link>
          <Link href='/excalidraw' style={{ color: "inherit" }}>
            <Text fz="lg" lh="md">
              Demo
            </Text>
          </Link>
          <Link href='/terms' style={{ color: "inherit" }}>
            <Text fz="lg" lh="md">
              Terms
            </Text>
          </Link>
        </Flex>
        <Text fz="xs" lh="md">
          © {new Date().getFullYear()} Nabil Mansour
        </Text>
      </Flex>
    </div>
  );
}