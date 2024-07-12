"use client";

import { Card, Center, Group, Modal, Text } from '@mantine/core';

import classes from './DrawingCard.module.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { useDisclosure } from '@mantine/hooks';

const NewDrawingCard = ({ isPhone }: { isPhone: boolean | undefined }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder className={classes.drawingCard} onClick={open} style={{ cursor: "pointer" }}>
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify='center'>
            <Text size='xl' fw={700} c="main">+ New Drawing</Text>
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
      <Modal centered opened={opened} onClose={close} title="+ New Drawing">
      </Modal>
    </>
  );
};

export default NewDrawingCard;