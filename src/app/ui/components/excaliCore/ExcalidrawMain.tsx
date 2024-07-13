"use client";

import dynamic from 'next/dynamic';
import { Box, Skeleton, useComputedColorScheme } from '@mantine/core';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import ActionElements from './ActionElements';
import { useEffect, useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const ExcalidrawMain = ({ payload, isOwner }: { payload: string, isOwner: boolean }) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [hasChanged, setHasChanged] = useState(false);
  const [elements, setElements] = useDebouncedState(payload, 100);
  const [pointerHit, setPointerHit] = useState(false);

  const handleChangesSaved = () => {
    setHasChanged(false);
    notifications.show({
      title: 'Saved 💾',
      message: 'Changes have been saved',
    })
  }

  useEffect(() => {
    console.log(elements);
    if (pointerHit) {
      setHasChanged(true);
    }
  }, [elements]);

  const onExcaliChange = (elements: readonly ExcalidrawElement[]) => {
    const visibleElements = elements.filter((element) => !element.isDeleted);
    setElements(JSON.stringify(visibleElements));
    // setHasChanged(elements === visibleElements);
    // console.log(JSON.stringify({ elements: visibleElements }));

    // const payload = JSON.stringify({ elements: visibleElements });
    // localStorage.setItem("excalidraw", payload);
  }

  return (
    <Box w="100%" h="100%">
      {isOwner && <ActionElements hasChanged={hasChanged} handleChangesSaved={handleChangesSaved} />}
      <Excalidraw theme={computedColorScheme}
        initialData={{ elements: JSON.parse(payload).elements }}
        onChange={onExcaliChange}
        onPointerDown={() => setPointerHit(true)}/>
    </Box>
  );
};

export default ExcalidrawMain;
