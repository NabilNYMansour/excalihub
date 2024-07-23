"use client";

import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { FaCircleInfo, FaCodeFork } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";

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
      {clerkIdExists ?
        <Tooltip label="Fork Drawing" position="left" withArrow>
          <form action={handleForkDrawing} onSubmit={() => setLoadingFork(true)}>
            <ActionIcon loading={loadingFork} color="gray" type="submit" size="lg" radius="md" variant="filled">
              <FaCodeFork />
            </ActionIcon>
          </form>
        </Tooltip> :
        <Tooltip label={"Sign up"} position="left" withArrow>
          <ActionIcon component="a" href="/sign-up" size="lg" radius="md" color='yellow'>
            <IoPersonAddSharp />
          </ActionIcon>
        </Tooltip>
      }
    </>
  );
};

export default AnonActions;