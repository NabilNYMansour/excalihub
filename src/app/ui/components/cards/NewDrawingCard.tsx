"use client";

import { Button, Card, Center, Flex, Group, Modal, Switch, Text, Textarea, TextInput, Tooltip } from '@mantine/core';

import classes from './DrawingCard.module.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { MdPublic } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { redirect, RedirectType } from 'next/navigation';

const NewDrawingCard = ({ clerkId, createDrawingAction }: { clerkId: string, createDrawingAction: (formData: FormData) => Promise<string> }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isPhone = useMediaQuery('(max-width: 350px)');
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
      {/* Main card */}
      <Card withBorder className={classes.drawingCard} onClick={open} style={{ cursor: "pointer" }}>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify='center'>
            <Text size='xl' fw={700} c="main">New Drawing</Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder inheritPadding p={0}>
          <div className={classes.drawing}
            style={{
              width: isPhone ? "250px" : "350px",
              height: "200px"
            }}>
            <Center h="100%" c="main">
              <FaCirclePlus size={85} />
            </Center>
          </div>
        </Card.Section>
      </Card>

      {/* Modal */}
      <Modal centered opened={opened} onClose={close} title={<Text fw={900}>Create New Drawing</Text>}>
        <form action={handleNewDrawing} onSubmit={() => setLoading(true)}>
          <Flex gap={10} direction="column">
            <TextInput size='lg' label="Title" name='title' placeholder="Drawing title" required />
            <Textarea size='lg' label="Description" name='description' placeholder="Drawing description" required />
            <Group>
              {publicDrawing ?
                <MdPublic size={20} color='green' /> :
                <FaEyeSlash size={20} color='red' />}
              <Switch
                label={publicDrawing ? " Drawing is Public" : " Drawing is Private"}
                color='green' size='md' onChange={togglePublicDrawing} name='isPublic' />
            </Group>
            <Group justify='right' w="100%">
              <Button loading={loading} type="submit" variant="light" rightSection={<IoMdSend />}>Create Drawing</Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default NewDrawingCard;