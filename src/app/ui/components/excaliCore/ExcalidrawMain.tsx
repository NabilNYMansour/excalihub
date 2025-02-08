"use client";

import dynamic from "next/dynamic";
import {
  ActionIcon,
  Box,
  Tooltip,
  useComputedColorScheme,
} from "@mantine/core";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useEffect, useState } from "react";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import classes from "./ExcalidrawMain.module.css";
import OwnerActions from "./components/OwnerActions";
import AnonActions from "./components/AnonActions";
import OwnerModal from "./components/OwnerModal";
import AnonModal from "./components/AnonModal";
import { redirect, RedirectType, usePathname } from "next/navigation";
import { IoMdShare } from "react-icons/io";
import { notifications } from "@mantine/notifications";
import { ThemeToggle } from "../buttons/ThemeToggle";
import { IoHome } from "react-icons/io5";
import ExcalidrawMainSkeleton from "./ExcalidrawMainSkeleton";
import {
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <ExcalidrawMainSkeleton />,
  }
);

const ExcalidrawMain = ({
  slug,
  payload,
  imgPayload,
  clerkId,
  isOwner,
  initPrivacy,
  initTitle,
  initDescription,
  ownerUsername,
  saveDrawingAction,
  updateDrawingInfoAction,
  forkDrawingAction,
}: {
  slug: string;
  payload: string;
  imgPayload?: string;
  clerkId: string;
  isOwner: boolean;
  initPrivacy: boolean;
  initTitle: string;
  initDescription: string;
  ownerUsername?: string;
  saveDrawingAction: (
    formData: FormData,
    slug: string,
    payload: string
  ) => Promise<boolean>;
  updateDrawingInfoAction: (
    formData: FormData,
    slug: string,
    name: string,
    description: string,
    isPublic: boolean
  ) => Promise<boolean>;
  forkDrawingAction: (formData: FormData, slug: string) => Promise<string>;
}) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const [initialData, setInitialData] = useState<ExcalidrawElement[] | null>(
    null
  );

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [hasChanged, setHasChanged] = useState(false);
  const [elements, setElements] = useDebouncedState<string>(payload, 100);
  const [imgElements, setImgElements] = useDebouncedState<string>(
    imgPayload ?? "",
    100
  );

  const [pointerHit, setPointerHit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [isPublic, setIsPublic] = useState(initPrivacy);

  const [loadingFork, setLoadingFork] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pointerHit) {
      setHasChanged(true);
    }
  }, [elements, imgElements]);

  const onExcaliChange = (
    elements: readonly ExcalidrawElement[],
    _: any,
    files: BinaryFiles
  ) => {
    console.log("%c Drawing change", "font-size: 14px;");
    const savedFiles = JSON.parse(imgPayload ?? "");
    const fileKeys = Object.keys(savedFiles);
    if (files) {
      let totalSize = 0;
      for (const key of fileKeys) {
        totalSize += savedFiles[key].dataURL.length * (3 / 4);
      }
      const oneMb = 1 * 1024 * 1024;
      if (totalSize >= oneMb) {
        notifications.show({
          title: "File too large",
          message: `The file exceeds the 1MB size limit.`,
          color: "red",
        });
        return;
      }
    }
    setImgElements(JSON.stringify(files));
    const visibleElements = elements.filter((element) => !element.isDeleted);
    setElements(JSON.stringify({ elements: visibleElements }));
  };

  const handleForkDrawing = async (formData: FormData) => {
    if (isPublic) {
      formData.set("isPublic", "1");
    }
    formData.set("clerkId", clerkId);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("payload", elements);
    const newSlug = await forkDrawingAction(formData, slug);
    if (newSlug) {
      notifications.show({
        title: "Drawing Forked",
        message: 'Drawing "' + title + '" forked successfully 👍',
      });
      redirect("/excalidraw/" + newSlug, RedirectType.push);
    } else {
      alert("Error forking drawing. Please try again.");
    }
    setLoadingFork(false);
  };

  const handleShareDrawing = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/excalidraw/${slug}`
    );
    notifications.show({
      title: "Share Drawing",
      message: 'Link for "' + title + '" copied to clipboard 👍',
    });
  };

  const handleInfoStatesChange = (
    title: string,
    description: string,
    isPublic: boolean
  ) => {
    setTitle(title);
    setDescription(description);
    setIsPublic(isPublic);
  };
  useEffect(() => {
    const initialLoad = async () => {
      const parsedPayload = JSON.parse(payload);
      const elements: ExcalidrawElement[] = parsedPayload?.elements;
      if (!payload || elements.length == 0) return;

      const assets = elements.filter(
        (element: ExcalidrawElement) => element.type === "image"
      );

      if (assets.length > 0) {
        const parsedImgPayload = JSON.parse(imgElements);
        const filesToAdd = assets
          .map((img) => (img.fileId ? parsedImgPayload[img.fileId] : null))
          .filter((file) => file !== null);

        if (filesToAdd.length > 0) {
          await excalidrawAPI?.addFiles(filesToAdd);
        }
      }

      setInitialData(elements);
    };
    initialLoad();
  }, [payload, excalidrawAPI]);

  return (
    <>
      {/* Main */}
      <Box w="100%" h="100%" className={classes.main}>
        <div className={classes.actionsWrapper}>
          <div className={classes.actions}>
            <Tooltip label="Home" position="left" withArrow>
              <ActionIcon
                component="a"
                href="/"
                size="lg"
                radius="md"
                variant="filled"
              >
                <IoHome />
              </ActionIcon>
            </Tooltip>
            {isOwner ? (
              <OwnerActions
                clerkId={clerkId}
                slug={slug}
                elements={elements}
                imgPayload={imgElements}
                saveDrawingAction={saveDrawingAction}
                setHasChanged={setHasChanged}
                hasChanged={hasChanged}
                openModal={open}
              />
            ) : (
              <AnonActions
                loadingFork={loadingFork}
                setLoadingFork={setLoadingFork}
                handleForkDrawing={handleForkDrawing}
                openModal={open}
                clerkIdExists={clerkId !== ""}
              />
            )}
            <Tooltip label="Share Drawing" position="left" withArrow>
              <ActionIcon
                size="lg"
                radius="md"
                variant="default"
                onClick={handleShareDrawing}
              >
                <IoMdShare />
              </ActionIcon>
            </Tooltip>
            <ThemeToggle
              size="lg"
              toolTipPos="left"
              variant="default"
              radius="md"
            />
          </div>
        </div>

        {initialData ? (
          <Excalidraw
            theme={computedColorScheme}
            UIOptions={{ tools: { image: true } }}
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            onChange={onExcaliChange}
            onPointerDown={() => setPointerHit(true)}
            initialData={{
              elements: initialData,
              scrollToContent: true,
            }}
          />
        ) : null}
      </Box>

      {/* Modal */}
      {isOwner ? (
        <OwnerModal
          opened={opened}
          close={close}
          initTitle={title}
          clerkId={clerkId}
          slug={slug}
          initDescription={description}
          initPrivacy={isPublic}
          updateDrawingInfoAction={updateDrawingInfoAction}
          handleInfoStatesChange={handleInfoStatesChange}
        />
      ) : (
        <AnonModal
          isDemo={pathname === "/excalidraw"}
          ownerUsername={ownerUsername!}
          opened={opened} // we can be certain ownerUsername is defined
          close={close}
          title={title}
          description={description}
        />
      )}
    </>
  );
};

export default ExcalidrawMain;
