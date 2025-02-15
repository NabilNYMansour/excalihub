"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { useHotkeys, useIdle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const OwnerActions = ({
  hasChanged,
  openModal,
  clerkId,
  saveDrawingAction,
  slug,
  elements,
  setHasChanged,
  triggerSave,
}: {
  hasChanged: boolean, openModal: () => void;
  clerkId: string, slug: string, elements: string;
  saveDrawingAction: (formData: FormData, slug: string, elements: string) => Promise<boolean>;
  setHasChanged: (hasChanged: boolean) => void;
  triggerSave: boolean;
}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const idle = useIdle(2000);

  useHotkeys([
    ['mod+s', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (hasChanged) {
        setLoadingSave(true);
        handleChangesSaved(new FormData());
      } else {
        notifications.show({
          title: 'No changes',
          message: 'No changes to save',
        })
      }
    }]
  ]);

  useEffect(() => {
    if (idle && hasChanged) {
      setLoadingSave(true);
      handleChangesSaved(new FormData());
    }
  }, [idle]);

  useEffect(() => {
    if (hasChanged) {
      setLoadingSave(true);
      handleChangesSaved(new FormData());
    }
  }, [triggerSave]);

  const handleChangesSaved = async (formData: FormData) => {
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
    setLoadingSave(false);
  }

  return (
    <>
      <Tooltip label="Settings" position="left" withArrow>
        <ActionIcon size="lg" radius="md" onClick={() => openModal()}>
          <IoSettingsOutline />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={hasChanged ? "Save changes" : "No changes"} position="left" withArrow>
        <form action={handleChangesSaved} onSubmit={() => setLoadingSave(true)}>
          <ActionIcon size="lg" radius="md" color='green'
            disabled={!hasChanged}
            type='submit'
            loading={loadingSave}
          >
            <IoIosSave />
          </ActionIcon>
        </form>
      </Tooltip>
    </>
  );
};

export default OwnerActions;