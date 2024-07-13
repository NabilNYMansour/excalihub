import CenterContainer from '../../ui/components/other/CenterContainer';

import { getDrawingBySlug, getUserIdByClerkId } from '@/db/queries';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const drawing = await getDrawingBySlug(params.slug);

  if (drawing.length === 0) { // if no such thing
    notFound(); // not found
  }

  if (drawing[0].isPublic === 0) { // if not public
    const clerkId = (await currentUser())?.id ?? ""; // get user clerk id
    const userId = (await getUserIdByClerkId(clerkId))?.[0]?.id; // get user id
    if (userId !== drawing[0].userId) {  // if not the owner
      notFound(); // not found
    }
  }

  return (
    <CenterContainer>
      {params.slug}
    </CenterContainer>
  );
};