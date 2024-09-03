"use client";

import { Card, Group, Skeleton, Text, useComputedColorScheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import classes from './DrawingCard.module.css';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const DrawingPublicCard = ({ drawing }: {
  drawing: {
    name: string;
    payload: string;
    slug: string;
    isPublic: number;
  };
}) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isSmallScreen = useMediaQuery('(max-width: 400px)');

  return (
    <Card radius="md" withBorder className={classes.drawingCard}>
      <Link href={`/excalidraw/${drawing.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify='center'>
            <Text size={isSmallScreen ? "md" : 'xl'} maw={150} fw={700} truncate="end">{drawing.name}</Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder inheritPadding p={0}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
          <div className={classes.drawing}
            style={{ width: "350px", height: "200px" }}>
            <Excalidraw theme={computedColorScheme}
              UIOptions={{ tools: { image: false } }}
              initialData={{
                elements: JSON.parse(drawing.payload).elements as any,
                scrollToContent: true,
                appState: { zoom: { value: 0.25 as any } }
              }} viewModeEnabled />
          </div>
        </Card.Section>
      </Link>
    </Card>
  );
};

export default DrawingPublicCard;