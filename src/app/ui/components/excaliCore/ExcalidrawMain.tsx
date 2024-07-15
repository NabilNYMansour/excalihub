"use client";

import dynamic from 'next/dynamic';
import { ActionIcon, Box, Skeleton, Tooltip, useComputedColorScheme } from '@mantine/core';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useEffect, useState } from 'react';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import classes from './ExcalidrawMain.module.css';
import OwnerActions from './components/OwnerActions';
import AnonActions from './components/AnonActions';
import OwnerModal from './components/OwnerModal';
import AnonModal from './components/AnonModal';
import { redirect, RedirectType } from 'next/navigation';
import { IoMdShare } from 'react-icons/io';
import { notifications } from '@mantine/notifications';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const ExcalidrawMain = (
  {
    slug, payload, clerkId,
    isPublic, isOwner, title,
    description, saveDrawingAction, updateDrawingInfoAction, forkDrawingAction
  }: {
    slug: string, payload: string, clerkId: string,
    isPublic: boolean, isOwner: boolean, title: string,
    description: string,
    saveDrawingAction: (formData: FormData, slug: string, payload: string) => Promise<boolean>,
    updateDrawingInfoAction: (formData: FormData, slug: string, name: string, description: string, isPublic: boolean) => Promise<boolean>
    forkDrawingAction: (formData: FormData, slug: string) => Promise<string>
  }) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [hasChanged, setHasChanged] = useState(false);
  const [elements, setElements] = useDebouncedState<string>(payload, 100);
  const [pointerHit, setPointerHit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (pointerHit) {
      setHasChanged(true);
    }
  }, [elements]);

  const onExcaliChange = (elements: readonly ExcalidrawElement[]) => {
    const visibleElements = elements.filter((element) => !element.isDeleted);
    setElements(JSON.stringify({ elements: visibleElements }));
  }

  const handleForkDrawing = async (formData: FormData) => {
    if (isPublic) {
      formData.set('isPublic', '1');
    }
    formData.set('clerkId', clerkId);
    formData.set('title', title);
    formData.set('description', description);
    formData.set('payload', elements);
    const newSlug = await forkDrawingAction(formData, slug);
    if (newSlug) {
      notifications.show({
        title: 'Drawing Forked',
        message: 'Drawing "' + title + '" forked successfully 👍',
      })
      redirect("/excalidraw/" + newSlug, RedirectType.push);
    }
    else { alert("Error forking drawing. Please try again.") }
  }

  const handleShareDrawing = () => {
    navigator.clipboard.writeText(`${window.location.origin}/excalidraw/${slug}`);
    notifications.show({
      title: 'Share Drawing',
      message: 'Link for "' + title + '" copied to clipboard 👍',
    })
  }

  return (
    <>
      {/* Main */}
      <Box w="100%" h="100%">
        <div className={classes.main}>
          {isOwner ?
            <OwnerActions
              clerkId={clerkId} slug={slug} elements={elements}
              saveDrawingAction={saveDrawingAction} setHasChanged={setHasChanged}
              hasChanged={hasChanged} openModal={open} /> :
            <AnonActions handleForkDrawing={handleForkDrawing} openModal={open} clerkIdExists={clerkId !== ""} />}
          <Tooltip label="Share Drawing" position="left" withArrow>
            <ActionIcon size="lg" radius="md" variant='default' onClick={handleShareDrawing}>
              <IoMdShare />
            </ActionIcon>
          </Tooltip>
        </div>

        <Excalidraw theme={computedColorScheme}
          initialData={{ elements: JSON.parse(payload).elements }}
          onChange={onExcaliChange} onPointerDown={() => setPointerHit(true)}
          UIOptions={{ tools: { image: false } }} />
      </Box>

      {/* Modal */}
      {isOwner ?
        <OwnerModal opened={opened} close={close} initTitle={title} clerkId={clerkId} slug={slug}
          initDescription={description} initPrivacy={isPublic} updateDrawingInfoAction={updateDrawingInfoAction} /> :
        <AnonModal opened={opened} close={close} title={title} description={description} />}
    </>
  );
};

export default ExcalidrawMain;
