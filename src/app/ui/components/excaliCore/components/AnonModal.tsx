"use client";

import { Flex, Modal, Spoiler, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const AnonModal = ({ ownerUsername, opened, close, title, description, isDemo }: {
  ownerUsername: string, opened: boolean, title: string, description: string,
  close: () => void, isDemo: boolean
}) => {

  return (
    <Modal opened={opened} onClose={close} title={<Text fw={900} size='xl'>Drawing Info</Text>} centered>
      <Flex gap={10} align="center">
        <Text c="main" size="lg" fw="bolder" span>Title:</Text>
        <Text size='md' span> {title} </Text>
        {!isDemo && <>
          <Text c="main" size="sm" fw="bolder" span>by </Text>
          <Link href={"/profile/" + ownerUsername} style={{ color: "inherit" }}>
            <Flex align="center">
              <Text size='md' span>
                {ownerUsername}
              </Text>
              <FiExternalLink />
            </Flex>
          </Link>
        </>
        }
      </Flex>
      <Text c="main" size="lg" fw="bolder">Description:</Text>
      <Spoiler maxHeight={120} showLabel="Show Description" hideLabel="Hide Description">
        <Text size='md'> {description}</Text>
      </Spoiler>
    </Modal>
  );
};

export default AnonModal;