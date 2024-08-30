"use client";

import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "./FeaturesCards.module.css";
import { FaCookie } from "react-icons/fa";
import { FaGaugeHigh, FaUser } from "react-icons/fa6";
import { SiMaterialdesignicons } from "react-icons/si";
import { GrSecure } from "react-icons/gr";

const mockdata = [
  {
    title: "Modern design",
    description:
    "OffloadRx is designed with the latest technologies to ensure that you have a seamless experience.",
    icon: SiMaterialdesignicons,
  },
  {
    title: "User friendly",
    description:
    "We have made the marketplace as user friendly as possible to ensure that you have a great experience.",
    icon: FaUser,
  },
  {
    title: "Secure",
    description:
    "We use the latest security protocols to ensure that your information is safe and secure.",
    icon: GrSecure,
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
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py={60}>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Never let valuable resources go to waste again
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Why allow your resources to go to waste when you can make the most of them? OffloadRx provides a marketplace for pharmacies to connect and share resources.
        Reducing waste and helping patients get the medications they need.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}