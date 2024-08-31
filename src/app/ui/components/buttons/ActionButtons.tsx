"use client";

import { ActionIcon, Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FaGithub } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";

export default function ActionButtons() {
  const isSmallScreen = useMediaQuery('(max-width: 750px)');

  if (isSmallScreen) {
    return <Group gap={10} justify="flex-end">
      <ActionIcon size="lg" radius="md" color="gray"
        component="a" href="https://github.com/NabilNYMansour/excalihub" target="_blank">
        <FaGithub size={20} />
      </ActionIcon>
      <ActionIcon size="lg" radius="md" color="green"
        component="a" href="https://buymeacoffee.com/nabilmansour" target="_blank">
        <SiBuymeacoffee size={20} />
      </ActionIcon>
    </Group>
  } else {
    return <Group gap={10}>
      <Button style={{ transition: "all 0.2s" }}
        radius="md" color="gray"
        component="a" href="https://github.com/NabilNYMansour/excalihub" target="_blank"
        rightSection={<FaGithub size={20} />}>
        Contribute on GitHub
      </Button>
      <Button style={{ transition: "all 0.2s" }}
        radius="md" color="green"
        component="a" href="https://buymeacoffee.com/nabilmansour" target="_blank"
        rightSection={<SiBuymeacoffee size={20} />}>
        Support the project
      </Button>
    </Group>
  }
}