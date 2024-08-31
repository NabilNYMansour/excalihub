"use client";

import { ActionIcon, Button, Card, Center, Flex, Group, Modal, Switch, Text, Textarea, TextInput, Tooltip } from '@mantine/core';
import { FaCirclePlus, FaPlus } from 'react-icons/fa6';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { MdPublic } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { redirect, RedirectType } from 'next/navigation';

const NewDrawingButton = ({ clerkId, createDrawingAction }: { clerkId: string, createDrawingAction: (formData: FormData) => Promise<string> }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isPhone = useMediaQuery('(max-width: 650px)');
  const [loading, setLoading] = useState(false);

  const [publicDrawing, setPublicDrawing] = useState(false);
  const togglePublicDrawing = () => setPublicDrawing((prev) => !prev);

  const handleNewDrawing = async (formData: FormData) => {
    if (publicDrawing) {
      formData.set('isPublic', '1');
    }
    formData.set('clerkId', clerkId);
    const slug = await createDrawingAction(formData);
    if (slug) { redirect("/excalidraw/" + slug, RedirectType.push) }
    else { alert("Error creating drawing. Please try again.") }
    setLoading(false);
  }

  return (
    <>
      {isPhone ?
        <Tooltip withArrow label="New Drawing">
          <ActionIcon onClick={open} size="xl" radius="md">
            <FaCirclePlus size={24} />
          </ActionIcon>
        </Tooltip>
        :
        <Button style={{ transition: "all 0.2s" }}
          radius="md" size='lg' onClick={open} rightSection={<FaPlus />}>New Drawing</Button>
      }

      {/* Modal */}
      <Modal centered opened={opened} onClose={close} title={<Text fw={900}>Create New Drawing</Text>}>
        <form action={handleNewDrawing} onSubmit={() => setLoading(true)}>
          <Flex gap={10} direction="column">
            <TextInput size='lg' label="Title" name='title' placeholder="Drawing title" required
              description={<Text size='sm'>min of 1 and max of 100 characters</Text>} />
            <Textarea size='lg' label="Description" name='description' placeholder="Drawing description"
              description={<Text size='sm'>max of 500 characters</Text>} />
            <Group>
              {publicDrawing ?
                <MdPublic size={20} color='green' /> :
                <FaEyeSlash size={20} color='red' />}
              <Switch
                label={publicDrawing ? " Drawing is Public" : " Drawing is Private"}
                color='green' size='md' onChange={togglePublicDrawing} name='isPublic' />
            </Group>
            <Group justify='right' w="100%">
              <Button
                style={{ transition: "all 0.2s" }}
                loading={loading} type="submit" variant="light" rightSection={<IoMdSend />}>Create Drawing</Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default NewDrawingButton;