import DrawingPublicCard from '@/app/ui/components/cards/DrawingPublicCard';
import SearchDrawings from '@/app/ui/components/excaliCore/components/SearchDrawings';
import CenterContainer from '@/app/ui/components/other/CenterContainer';
import PaginationControls from '@/app/ui/components/other/PaginationControls';
import { getAllUserDrawingsPaginatedWithSearchTermPublicOnly, getDrawingsCountWithSearchTermPublicOnly, getUserIdByClerkId } from '@/db/queries';
import { clerkClient } from '@clerk/nextjs/server';
import { Box, Card, Flex, Group, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import React from 'react';

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
    const drawings = await getAllUserDrawingsPaginatedWithSearchTermPublicOnly(userId, String(searchTerm), Number(page), limit);

    const numberOfDrawings = await getDrawingsCountWithSearchTermPublicOnly(userId, String(searchTerm));
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