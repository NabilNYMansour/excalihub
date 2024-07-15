"use client";

import { useEffect } from "react";
import CenterContainer from "./CenterContainer";
import { Loader } from "@mantine/core";

const UserBeingProcessed = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  return <CenterContainer><Loader /></CenterContainer>
};

export default UserBeingProcessed;