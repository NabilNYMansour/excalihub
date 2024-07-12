"use client";

import { ActionIcon, Avatar, Button, Card, Group, Menu, Skeleton, Text, useComputedColorScheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';
import { emptuExcaliData, initialLandingExcaliData } from '../other/Constants';
import { BsThreeDots } from 'react-icons/bs';
import { FaEyeSlash, FaTrashAlt } from 'react-icons/fa';
import classes from './DrawingCard.module.css';
import { IoMdShare } from 'react-icons/io';
import { IoOpenOutline } from 'react-icons/io5';
import { MdPublic } from 'react-icons/md';
import { useMediaQuery } from '@mantine/hooks';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const DrawingCard = ({ drawing }: {
  drawing: {
    name: string;
    payload: string;
    slug: string;
  }
}) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isPhone = useMediaQuery('(max-width: 350px)');

  return (
    <Card withBorder className={classes.drawingCard}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify='space-between'>

          <Avatar variant='transparent' color='red.9' size="sm" radius="xl"><FaEyeSlash size={20} /></Avatar>
          <Text size={isPhone ? "md" : 'xl'} fw={700}>My Drawing</Text>

          {/* Menu */}
          <Menu withinPortal position="bottom-end" shadow="sm">
            {/* Menu Target */}
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <BsThreeDots size={24} />
              </ActionIcon>
            </Menu.Target>
            {/* Menu DropDown */}
            <Menu.Dropdown>

              <Menu.Item
                leftSection={<IoOpenOutline size={14} />}>
                Open in a new tab
              </Menu.Item>

              <Menu.Item
                leftSection={<MdPublic size={14} />}
                color='green'>
                Make Drawing public
              </Menu.Item>

              <Menu.Item
                leftSection={<IoMdShare size={14} />}>
                Share Drawing
              </Menu.Item>

              <Menu.Item
                leftSection={<FaTrashAlt size={14} />}
                color="#ff0000">
                Delete Drawing
              </Menu.Item>

            </Menu.Dropdown>
          </Menu>

        </Group>
      </Card.Section>
      <Card.Section withBorder inheritPadding p={0} onClick={() => { console.log("Test") }} style={{ cursor: "pointer" }}>
        <div className={classes.drawing}
          style={{
            width: isPhone ? "250px" : "350px",
            height: "200px"
          }}>
          <Excalidraw theme={computedColorScheme}
            UIOptions={{ tools: { image: false } }}
            initialData={{
              elements:
                drawing.payload ? emptuExcaliData.elements as any :
                  JSON.parse(drawing.payload).elements as any,
              scrollToContent: true,
              appState: { zoom: { value: 0.5 as any } }
            }} viewModeEnabled />
        </div>
      </Card.Section>
    </Card>
  );
};

export default DrawingCard;