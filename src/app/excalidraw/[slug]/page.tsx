import { getClerkIdGivenId, getDrawingBySlug, getUserIdByClerkId, updateDrawingInfo } from '@/db/queries';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import ExcalidrawMain from '@/app/ui/components/excaliCore/ExcalidrawMain';
import { forkDrawingAction, saveDrawingAction, updateDrawingInfoAction } from '@/lib/actions';

export default async function Page({ params }: { params: { slug: string } }) {
  const drawing = await getDrawingBySlug(params.slug);

  if (drawing.length === 0) { // if no such thing
    notFound(); // not found
  }

  // Check if user is allowed to view drawing
  const clerkId = (await currentUser())?.id ?? ""; // get user clerk id
  const userId = (await getUserIdByClerkId(clerkId))?.[0]?.id; // get user id
  const isOwner = userId === drawing[0].userId;
  if (drawing[0].isPublic !== 1 && !isOwner) { // if not public and user is not the owner
    notFound(); // not found
  }

  return <ExcalidrawMain
    slug={params.slug}
    initTitle={drawing[0].name}
    initDescription={drawing[0].description}
    payload={drawing[0].payload}
    clerkId={clerkId}
    initPrivacy={drawing[0].isPublic === 1}
    isOwner={isOwner}
    ownerUsername={"TEST"}
    saveDrawingAction={saveDrawingAction}
    updateDrawingInfoAction={updateDrawingInfoAction} 
    forkDrawingAction={forkDrawingAction}/>
};
