"use client";

import { Text } from '@mantine/core';
import classes from './Footer.module.css';
import { usePathname } from 'next/navigation';

export function Footer() {
  const currPath = usePathname();

  if (/\/excalidraw/.test(currPath)) {
    return null;
  }

  return (
    <div className={classes.footer}>
      <Text fz="xs" lh="md">
        © {new Date().getFullYear()} Nabil Mansour
      </Text>
    </div>
  );
}