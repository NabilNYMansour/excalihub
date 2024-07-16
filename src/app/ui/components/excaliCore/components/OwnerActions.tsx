import { ActionIcon, Tooltip } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IoIosSave } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const OwnerActions = ({ hasChanged, openModal, clerkId, saveDrawingAction, slug, elements, setHasChanged }:
  {
    hasChanged: boolean, openModal: () => void,
    clerkId: string, slug: string, elements: string,
    saveDrawingAction: (formData: FormData, slug: string, elements: string) => Promise<boolean>,
    setHasChanged: (hasChanged: boolean) => void
  }
) => {
  useHotkeys([
    ['mod+s', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (hasChanged) {
        handleChangesSaved(new FormData());
      } else {
        notifications.show({
          title: 'No changes',
          message: 'No changes to save',
        })
      }
    }]
  ]);

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
  }

  return (
    <>
      <Tooltip label="Settings" position="left" withArrow>
        <ActionIcon size="lg" radius="md" onClick={() => openModal()}>
          <IoSettingsOutline />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={hasChanged ? "Save changes" : "No changes"} position="left" withArrow>
        <form action={handleChangesSaved}>
          <ActionIcon size="lg" radius="md" color='green'
            onKeyDownCapture={(e) => { console.log('keydown', e) }}
            disabled={!hasChanged}
            type='submit'>
            <IoIosSave />
          </ActionIcon>
        </form>
      </Tooltip>
    </>
  );
};

export default OwnerActions;