import DrawingPublicCard from '@/app/ui/components/cards/DrawingPublicCard';
import SearchDrawings from '@/app/ui/components/excaliCore/components/SearchDrawings';
import CenterContainer from '@/app/ui/components/other/CenterContainer';
import PaginationControls from '@/app/ui/components/other/PaginationControls';
import { getUserPublicDrawings, getUserPublicDrawingsCount, getUserIdByClerkId } from '@/db/queries';
import { MAIN_URL } from '@/lib/constants';
import { clerkClient } from '@clerk/nextjs/server';
import { Box, Card, Flex, Group, Text } from '@mantine/core';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  let clerkId = "";
  const clerkUserQuery = await clerkClient().users.getUserList({ username: [params.username] });
  if (clerkUserQuery.totalCount === 0) {
    notFound();
  } else {
    clerkId = clerkUserQuery.data[0].id;
  }

  const title = params.username+"'s Drawings";
  const description = "View all of "+params.username+"'s public drawings.";
  const imageLink = `${MAIN_URL}/ExcalihubLogoTitle.png`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${MAIN_URL}/profile/${params.username}`
    },
    openGraph: {
      title: title,
      description: description,
      url: `${MAIN_URL}/profile/${params.username}`,
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
  }
}

const Page = async ({ params, searchParams }: { params: { username: string }, searchParams: SearchParams }) => {
  let clerkId = "";
  const clerkUserQuery = await clerkClient().users.getUserList({ username: [params.username] });
  if (clerkUserQuery.totalCount === 0) {
    notFound();
  } else {
    clerkId = clerkUserQuery.data[0].id;
  }

  const userIdQuery = await getUserIdByClerkId(clerkId);
  if (userIdQuery.length === 0) {
    notFound();
  } else {
    const page = searchParams["page"] ?? "1";
    const searchTerm = searchParams["search"] ?? "";
    const userId = userIdQuery[0].id;
    const limit = 6
    const drawings = await getUserPublicDrawings(userId, String(searchTerm), Number(page), limit);

    const numberOfDrawings = await getUserPublicDrawingsCount(userId, String(searchTerm));
    const numberOfPages = Math.ceil(numberOfDrawings[0].count / limit);

    return (
      <CenterContainer size="xl">
        <Flex direction="column" align="center" h="100%" w="100%" >
          <Text p={25}>{params.username}&apos;s Drawings</Text>

          <Card shadow="xs" padding="md" radius="md" w="100%" maw={1108}>
            <Flex direction="column" gap={10} w="100%">

              {/*=============Search and new drawing=============*/}
              <Flex w="100%" gap={10} align="center">
                <Box flex={4}><SearchDrawings /></Box>
              </Flex>

              {/*=============The drawings=============*/}
              <Group justify="center" gap={10}>
                {drawings.length > 0 ? drawings.map((drawing, i) =>
                  <DrawingPublicCard drawing={drawing}
                    key={drawing.name + drawing.isPublic + drawing.slug + i} />
                ) :
                  <Text size='xl' fw={900}>
                    (☞ﾟヮﾟ)☞ No Drawings yet...
                  </Text>
                }
              </Group>

              {/*=============Pagination=============*/}
              <PaginationControls currentPage={Number(page)} numberOfPages={numberOfPages} />

            </Flex>
          </Card>

        </Flex>
      </CenterContainer>
    );
  }
};

export default Page;