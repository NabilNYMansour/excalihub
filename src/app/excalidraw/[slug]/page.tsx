import { getClerkIdGivenId, getDrawingBySlug, getUserIdByClerkId } from '@/db/queries';
import { clerkClient } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import ExcalidrawMain from '@/app/ui/components/excaliCore/ExcalidrawMain';
import { forkDrawingAction, saveDrawingAction, updateDrawingInfoAction } from '@/lib/actions';
import { Metadata } from 'next';
import { MAIN_URL } from '@/lib/constants';
import { getCurrentUserId } from '@/auth';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const drawing = await getDrawingBySlug(params.slug);

  if (drawing.length === 0) { // if no such thing
    notFound(); // not found
  }

  // Check if user is allowed to view drawing
  const clerkId = await getCurrentUserId() ?? ""; // get user clerk id
  const userId = (await getUserIdByClerkId(clerkId))?.[0]?.id; // get user id
  const isOwner = userId === drawing[0].userId;
  if (drawing[0].isPublic !== 1 && !isOwner) { // if user is not the owner and drawing is not public
    notFound(); // not found
  }

  const ownerClerkId = (await getClerkIdGivenId(drawing[0].userId))[0].clerkId;
  const owerUserObject = await clerkClient().users.getUser(ownerClerkId);
  const ownerUsername = owerUserObject.username!;

  const title = drawing[0].name + " by " + ownerUsername;
  const description = drawing[0].description;
  const imageLink = `${MAIN_URL}/ExcalihubLogoTitle.png`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${MAIN_URL}/excalidraw/${params.slug}`
    },
    openGraph: {
      title: title,
      description: description,
      url: `${MAIN_URL}/excalidraw/${params.slug}`,
      type: "article",
      images: [
        {
          url: imageLink,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: imageLink,
    },
    creator: ownerUsername,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const drawing = await getDrawingBySlug(params.slug);

  if (drawing.length === 0) { // if no such thing
    notFound(); // not found
  }

  // Check if user is allowed to view drawing
  const clerkId = await getCurrentUserId() ?? ""; // get user clerk id
  const userId = (await getUserIdByClerkId(clerkId))?.[0]?.id; // get user id
  const isOwner = userId === drawing[0].userId;
  if (drawing[0].isPublic !== 1 && !isOwner) { // if user is not the owner and drawing is not public
    notFound(); // not found
  }

  let ownerUsername = undefined;
  if (!isOwner) { // if not owner but drawing is public
    const ownerClerkId = (await getClerkIdGivenId(drawing[0].userId))[0].clerkId;
    const owerUserObject = await clerkClient().users.getUser(ownerClerkId);
    ownerUsername = owerUserObject.username!;
  }

  return <ExcalidrawMain
    slug={params.slug}
    initTitle={drawing[0].name}
    initDescription={drawing[0].description}
    payload={drawing[0].payload}
    clerkId={clerkId}
    initPrivacy={drawing[0].isPublic === 1}
    isOwner={isOwner}
    ownerUsername={ownerUsername}
    saveDrawingAction={saveDrawingAction}
    updateDrawingInfoAction={updateDrawingInfoAction}
    forkDrawingAction={forkDrawingAction} />
};
