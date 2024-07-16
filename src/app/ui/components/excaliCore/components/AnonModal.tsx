import { Box, Modal, Spoiler, Text } from "@mantine/core";

const AnonModal = ({ ownerUsername, opened, close, title, description }: {
  ownerUsername: string, opened: boolean, title: string, description: string,
  close: () => void
}) => {

  return (
    <Modal opened={opened} onClose={close} title={<Text fw={900} size='xl'>Drawing Info</Text>} centered>
      <Box>
        <Text c="main" size="lg" fw="bolder" span>Title:</Text>
        <Text size='md' span> {title} </Text>
        <Text c="main" size="sm" fw="bolder" span>by</Text>
        <Text size='md' span> {ownerUsername}</Text>
      </Box>
      <Text c="main" size="lg" fw="bolder">Description:</Text>
      <Spoiler maxHeight={120} showLabel="Show Description" hideLabel="Hide Description">
        <Text size='md'> {description}</Text>
      </Spoiler>
    </Modal>
  );
};

export default AnonModal;