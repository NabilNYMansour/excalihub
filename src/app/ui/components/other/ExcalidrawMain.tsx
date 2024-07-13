import dynamic from 'next/dynamic';
import { Skeleton } from '@mantine/core';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

const ExcalidrawMain = () => {

  return (
    <div>
      Excali main
    </div>
  );
};

export default ExcalidrawMain;