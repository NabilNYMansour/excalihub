"use client";

import { ActionIcon, Button, Card, Flex, Group, Menu, Modal, Skeleton, Text, useComputedColorScheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';
import { emptuExcaliData } from '../other/Constants';
import { BsThreeDots } from 'react-icons/bs';
import { FaEyeSlash, FaTrashAlt } from 'react-icons/fa';
import classes from './DrawingCard.module.css';
import { IoMdShare } from 'react-icons/io';
import { IoOpenOutline } from 'react-icons/io5';
import { MdOutlineCancel, MdPublic } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const DrawingCard = ({ drawing, toggleAction, deleteAction }: {
  toggleAction: (slug: string) => Promise<boolean>;
  deleteAction: (slug: string) => Promise<boolean>;
  drawing: {
    name: string;
    payload: string;
    slug: string;
    isPublic: number;
  },
}) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [opened, { open, close }] = useDisclosure(false);
  const isPhone = useMediaQuery('(max-width: 350px)');
  const router = useRouter();

  const handleTogglePrivacy = async () => {
    const res = await toggleAction(drawing.slug);
    if (res) {
      router.refresh();
    } else {
      alert("Error toggling drawing privacy. Please try again.");
    }
  };

  const handleDelete = async () => {
    const res = await deleteAction(drawing.slug);
    if (res) {
      router.refresh();
      close();
    } else {
      alert("Error deleting drawing. Please try again.");
    }
  }

  return (
    <>
      <Card withBorder className={classes.drawingCard}>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify='space-between'>

            {drawing.isPublic === 0 ? <FaEyeSlash size={20} color='red' /> : <MdPublic size={20} color='green' />}
            <Text size={isPhone ? "md" : 'xl'} fw={700}>{drawing.name}</Text>

            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <BsThreeDots size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>

                <Menu.Item
                  component='a'
                  href={`/excalidraw/${drawing.slug}`}
                  target='_blank'
                  leftSection={<IoOpenOutline size={14} />}>
                  Open in a new tab
                </Menu.Item>


                <form action={handleTogglePrivacy}>
                  <Menu.Item
                    component='button'
                    type='submit'
                    leftSection={drawing.isPublic === 1 ? <FaEyeSlash size={14} /> : <MdPublic size={14} />}
                    color={drawing.isPublic === 1 ? "red" : "green"}>
                    Make Drawing {drawing.isPublic === 1 ? "Private" : "Public"}
                  </Menu.Item>
                </form>

                <Menu.Item
                  component='button'
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/excalidraw/${drawing.slug}`);
                    notifications.show({
                      title: 'Share Drawing',
                      message: 'Link for ' + drawing.name + ' copied to clipboard 👍',
                    })
                  }}
                  leftSection={<IoMdShare size={14} />}>
                  Share Drawing
                </Menu.Item>

                {/* <form action={handleDelete}> */}
                <Menu.Item
                  component='button'
                  onClick={open}
                  leftSection={<FaTrashAlt size={14} />}
                  color="#ff0000">
                  Delete Drawing
                </Menu.Item>
                {/* </form> */}

              </Menu.Dropdown>
            </Menu>

          </Group>
        </Card.Section>
        <Card.Section withBorder inheritPadding p={0} style={{ cursor: "pointer" }}>
          <Link href={`/excalidraw/${drawing.slug}`}>
            <div className={classes.drawing}
              style={{
                width: isPhone ? "250px" : "350px",
                height: "200px"
              }}>
              <Excalidraw theme={computedColorScheme}
                UIOptions={{ tools: { image: false } }}
                initialData={{
                  elements:
                    drawing.payload ? JSON.parse(drawing.payload).elements as any :
                      emptuExcaliData.elements as any,
                  scrollToContent: true,
                  appState: { zoom: { value: 0.5 as any } }
                }} viewModeEnabled />
            </div>
          </Link>
        </Card.Section>
      </Card>

      {/* Delete "are you sure" modal */}
      <Modal centered opened={opened} onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        title={
          <Text fw={900} c="#ff0000">
            {"Delete " + drawing.name + "?"}
          </Text>
        }>
        <Flex direction="column" gap={10}>
          <Text>Are you sure you want to delete this drawing?</Text>
          <Group justify='right' w="100%">
            <Button onClick={close} variant="light" rightSection={<MdOutlineCancel />}>Cancel</Button>
            <form action={handleDelete}>
              <Button type="submit" variant="filled" color='red' rightSection={<FaTrashAlt />}>Delete Drawing</Button>
            </form>
          </Group>
        </Flex>
      </Modal>
    </>
  );
};

export default DrawingCard;