"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { FaCircleInfo } from "react-icons/fa6";
import { CgGitFork } from "react-icons/cg";
import { useState } from "react";

const AnonActions = ({ openModal, clerkIdExists, handleForkDrawing, loadingFork, setLoadingFork }: {
  openModal: () => void, clerkIdExists: boolean,
  handleForkDrawing: (formData: FormData) => void,
  loadingFork: boolean, setLoadingFork: (loading: boolean) => void
}) => {
  return (
    <>
      <Tooltip label="Info" position="left" withArrow>
        <ActionIcon size="lg" radius="md" onClick={() => openModal()}>
          <FaCircleInfo />
        </ActionIcon>
      </Tooltip>
      {clerkIdExists && <Tooltip label="Fork Drawing" position="left" withArrow>
        <form action={handleForkDrawing} onSubmit={() => setLoadingFork(true)}>
          <ActionIcon loading={loadingFork} type="submit" size="lg" radius="md" variant="default">
            <CgGitFork size={24} />
          </ActionIcon>
        </form>
      </Tooltip>}
    </>
  );
};

export default AnonActions;