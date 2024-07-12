"use client";

import { User } from "@clerk/nextjs/server";
import CenterContainer from "../other/CenterContainer";
import DrawingCard from "../cards/DrawingCard";
import NewDrawingCard from "../cards/NewDrawingCard";
import { Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";


const HomePageComponent = ({ name, id }: { name: string | null, id: string | null }) => {
  const isPhone = useMediaQuery('(max-width: 650px)');

  return (
    <CenterContainer size="xl">
      Hi {name}!
      <Group justify="center">
        <DrawingCard isPhone={isPhone} />
        <NewDrawingCard isPhone={isPhone} />
      </Group>
    </CenterContainer>
  );
};

export default HomePageComponent;
