"use client";

import { Button, Flex, Group, Modal, Switch, Text, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdPublic } from "react-icons/md";

const OwnerModal = ({
  opened, close, initTitle, initDescription,
  initPrivacy, updateDrawingInfoAction, clerkId,
  handleInfoStatesChange, slug }: {
    opened: boolean, close: () => void,
    initTitle: string, initDescription: string, initPrivacy: boolean,
    updateDrawingInfoAction: (
      formData: FormData, slug: string, title: string, description: string, privacy: boolean
    ) => Promise<boolean>,
    handleInfoStatesChange: (title: string, description: string, privacy: boolean) => void,
    clerkId: string, slug: string
  }) => {
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [hasChanged, setHasChanged] = useState(false);
  const [privacy, setPrivacy] = useState(initPrivacy);
  const [loading, setLoading] = useState(false);

  const handleDrawingInfoChange = async (formData: FormData) => {
    formData.set('clerkId', clerkId);
    const res = await updateDrawingInfoAction(formData, slug, title, description, privacy);
    if (res) {
      notifications.show({
        title: 'Drawing info updated ℹ️',
        message: 'Changes have been saved',
      })
      setHasChanged(false);
      handleInfoStatesChange(title, description, privacy);
      close();
    } else {
      alert("Error saving drawing info. Please try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (title !== initTitle || description !== initDescription || privacy !== initPrivacy) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [title, description, privacy]);

  return (
    <Modal opened={opened} onClose={close} title={<Text fw={900} size='xl'>Drawing Settings</Text>} centered>
      <Flex gap={10} direction="column">
        <TextInput
          size="lg"
          label="Title" name='title'
          placeholder="Drawing title" onChange={(e) => setTitle(e.currentTarget.value)}
          required value={title} />
        <Textarea
          size="lg"
          label="Description" name='description'
          placeholder="Drawing description" onChange={(e) => setDescription(e.currentTarget.value)}
          value={description} required autosize maxRows={5} />
        <Group>
          {privacy ?
            <MdPublic size={20} color='green' /> :
            <FaEyeSlash size={20} color='red' />}
          <Switch
            label={privacy ? " Drawing is Public" : " Drawing is Private"} defaultChecked={privacy}
            color='green' size='md' name='isPublic' onChange={() => setPrivacy(!privacy)} />
        </Group>
        <Group justify='right' w="100%">
          <form action={handleDrawingInfoChange} onSubmit={() => setLoading(true)}>
            <Button type="submit" variant="filled" loading={loading}
              disabled={!hasChanged} rightSection={<IoMdSend />}>
              Confirm changes
            </Button>
          </form>
        </Group>
      </Flex>
    </Modal>
  );
};

export default OwnerModal;