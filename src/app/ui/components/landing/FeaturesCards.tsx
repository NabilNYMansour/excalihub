"use client";

import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "./FeaturesCards.module.css";
import { FaCouch, FaMousePointer } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";

const mockdata = [
  {
    title: "To the point",
    description:
    "You log in, you see your whiteboards, you can create new ones, and you can share them with others. Nothing more, nothing less.",
    icon: FaMousePointer,
  },
  {
    title: "Completely Free",
    description:
    "The aim of ExcaliHub is to provide a free service to all users. No hidden fees, no premium plans.",
    icon: GiButterfly,
  },
  {
    title: "No ads, no tracking",
    description:
    "We don't track you, we don't show you ads. We don't even have a newsletter. We just want to provide a service.",
    icon: FaCouch,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="sm" radius="md" padding="xl" className={classes.card}>
      <feature.icon
        style={{ width: rem(30), height: rem(30) }}
        color={theme.colors.main[6]}
      />
      <Text fz="lg" fw={700} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py={60}>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Have all your whiteboards in one place
      </Title>

      <Text className={classes.description} ta="center" mt="md">
        If you are a fan of Excalidraw, and just want a place to store all your whiteboards, then ExcaliHub is made for you.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}