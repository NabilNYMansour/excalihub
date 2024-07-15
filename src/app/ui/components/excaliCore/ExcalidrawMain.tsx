"use client";

import dynamic from 'next/dynamic';
import { ActionIcon, Box, Button, Flex, Modal, Skeleton, Switch, Text, ThemeIcon, Tooltip, useComputedColorScheme } from '@mantine/core';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useEffect, useState } from 'react';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FaEyeSlash } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';
import classes from './ExcalidrawMain.module.css';


const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const ExcalidrawMain = ({ slug, payload, clerkId, isPublic, isOwner, title, description, saveDrawingAction, toggleAction }:
  {
    slug: string, payload: string, clerkId: string, isPublic: boolean, isOwner: boolean, title: string, description: string
    saveDrawingAction: (formData: FormData, slug: string, payload: string) => Promise<boolean>,
    toggleAction: (formData: FormData, slug: string) => Promise<boolean>
  }) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [hasChanged, setHasChanged] = useState(false);
  const [elements, setElements] = useDebouncedState<string>(payload, 100);
  const [pointerHit, setPointerHit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const handleChangesSaved = async (formData: FormData) => {
    if (isOwner) {
      formData.set('clerkId', clerkId);
      const res = await saveDrawingAction(formData, slug, elements);
      if (res) {
        setHasChanged(false);
        notifications.show({
          title: 'Saved 💾',
          message: 'Changes have been saved',
        })
      } else {
        alert("Error saving drawing. Please try again.");
      }
    }
  }

  const handleTogglePrivacy = async (formData: FormData) => {
    if (isOwner) {
      formData.set('clerkId', clerkId);
      const res = await toggleAction(formData, slug);
      if (res) {
        router.refresh();
        notifications.show({
          title: <Flex align="center" gap={5}>
            <ThemeIcon variant='transparent' size="sm">{isPublic ? <FaEyeSlash size={28} color='red' /> : <MdPublic size={28} color='green' />}</ThemeIcon>
            Privacy changes
          </Flex>,
          message: '"' + title + '" is now ' + (isPublic ? 'private' : 'public'),
        })
      } else {
        alert("Error toggling drawing privacy. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (pointerHit) {
      setHasChanged(true);
    }
  }, [elements]);

  const onExcaliChange = (elements: readonly ExcalidrawElement[]) => {
    const visibleElements = elements.filter((element) => !element.isDeleted);
    setElements(JSON.stringify({ elements: visibleElements }));
  }

  return (
    <>
      {/* Main */}
      <Box w="100%" h="100%">
        <div className={classes.main}>
          <ActionIcon size="lg" radius="md" onClick={() => open()}>
            <IoSettingsOutline />
          </ActionIcon>
          <Tooltip label={hasChanged ? "Save changes" : "No changes"} position="left" withArrow>
            <form action={handleChangesSaved}>
              <ActionIcon size="lg" radius="md" color='green'
                disabled={!hasChanged}
                type='submit'>
                <IoIosSave />
              </ActionIcon>
            </form>
          </Tooltip>
        </div>

        <Excalidraw theme={computedColorScheme}
          initialData={{ elements: JSON.parse(payload).elements }}
          onChange={onExcaliChange} onPointerDown={() => setPointerHit(true)}
          UIOptions={{ tools: { image: false } }} />
      </Box>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title={<Text fw={900} size='xl'>Drawing Settings</Text>} centered>
        <form action={handleTogglePrivacy}>
          <Button
            type='submit'
            leftSection={isPublic ? <FaEyeSlash size={14} /> : <MdPublic size={14} />}
            color={isPublic ? "red" : "green"}>
            Make Drawing {isPublic ? "Private" : "Public"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ExcalidrawMain;
