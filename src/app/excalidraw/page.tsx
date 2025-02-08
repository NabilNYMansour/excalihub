import ExcalidrawMain from '@/app/ui/components/excaliCore/ExcalidrawMain';
import { getCurrentUserId } from '@/auth';
import { forkWelcomeDrawingAction, saveDrawingAction, updateDrawingInfoAction } from '@/lib/actions';
import { WELCOME_EXCALI_DATA } from '@/lib/constants';

export default async function Page() {
  const clerkId = await getCurrentUserId() ?? ""; // get user clerk id

  return <ExcalidrawMain
    slug={""}
    initTitle={"Welcome to ExcaliHub"}
    initDescription={"ExcaliHub is a free platform for sharing and collaborating on Excalidraw drawings."}
    payload={JSON.stringify(WELCOME_EXCALI_DATA)}
    clerkId={clerkId}
    initPrivacy={true}
    isOwner={false}
    ownerUsername={""}
    saveDrawingAction={saveDrawingAction}
    updateDrawingInfoAction={updateDrawingInfoAction}
    forkDrawingAction={forkWelcomeDrawingAction} />
};
