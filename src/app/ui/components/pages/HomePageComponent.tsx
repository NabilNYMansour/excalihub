import CenterContainer from "../other/CenterContainer";
import DrawingCard from "../cards/DrawingCard";
import { Box, Card, Flex, Group, Text } from "@mantine/core";
import { getAllUserDrawingsPaginatedWithSearchTerm, getDrawingsCountWithSearchTerm, getUserIdByClerkId } from "@/db/queries";
import { createDrawingAction, deleteDrawingAction, togglePublicDrawingAction } from "@/lib/actions";
import PaginationControls from "../other/PaginationControls";
import UserBeingProcessed from "../other/UserBeingProcessed";
import SearchDrawings from "../excaliCore/components/SearchDrawings";
import NewDrawingButton from "../buttons/NewDrawingButton";

async function HomePageComponent({ searchParams, name, clerkId }: { searchParams: SearchParams, name: string | null, clerkId: string | null }) {
  if (!name || !clerkId) throw new Error("User not found");

  const userIdQuery = await getUserIdByClerkId(clerkId);
  if (userIdQuery.length > 0) {
    const page = searchParams["page"] ?? "1";
    const searchTerm = searchParams["search"] ?? "";
    const userId = userIdQuery[0].id;
    const limit = 6
    const drawings = await getAllUserDrawingsPaginatedWithSearchTerm(userId, String(searchTerm), Number(page), limit);

    const numberOfDrawings = await getDrawingsCountWithSearchTerm(userId, String(searchTerm));
    const numberOfPages = Math.ceil(numberOfDrawings[0].count / limit);

    return (
      <CenterContainer size="xl">
        <Flex direction="column" align="center" h="100%" w="100%" >
          <Text p={25}>Hi {name}! 👋</Text>

          <Card shadow="xs" padding="md" radius="md" w="100%" maw={1108}>
            <Flex direction="column" gap={10} w="100%">

              {/*=============Search and new drawing=============*/}
              <Flex w="100%" gap={10} align="center">
                <Box flex={4}><SearchDrawings /></Box>
                <NewDrawingButton clerkId={clerkId} createDrawingAction={createDrawingAction} />
              </Flex>

              {/*=============The drawings=============*/}
              <Group justify="center" gap={10}>
                {drawings.length > 0 ? drawings.map((drawing, i) => <DrawingCard drawing={drawing}
                  key={drawing.name + drawing.isPublic + drawing.slug + i}
                  deleteAction={deleteDrawingAction}
                  toggleAction={togglePublicDrawingAction}
                  clerkId={clerkId} />) :
                  <Text size='xl' fw={900}>
                    Time to make some drawings... ᕕ(ᐛ)ᕗ
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
  } else { // if a clerkId exists but a userId does not. Then the webhook is potentially still processing the user creation.
    return <UserBeingProcessed />; // will reload the page after 1 second
  }
};

export default HomePageComponent;
