import { Modal, Spoiler, Text } from "@mantine/core";

const AnonModal = ({ opened, close, title, description }: {
  opened: boolean, title: string, description: string,
  close: () => void
}) => {

  return (
    <Modal opened={opened} onClose={close} title={<Text fw={900} size='xl'>Drawing Info</Text>} centered>
      <p>
        <Text c="main" size="lg" fw="bolder" span>Title:</Text>
        <Text size='md' span> {title}</Text>
      </p>
      <Text c="main" size="lg" fw="bolder">Description:</Text>
      <Spoiler maxHeight={120} showLabel="Show Description" hideLabel="Hide Description">
        <Text size='md'> {description}</Text>
      </Spoiler>
    </Modal>
  );
};

export default AnonModal;