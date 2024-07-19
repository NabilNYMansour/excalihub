import CenterContainer from "../other/CenterContainer";
import DrawingCard from "../cards/DrawingCard";
import NewDrawingCard from "../cards/NewDrawingCard";
import { Flex, Group } from "@mantine/core";
import { getAllUserDrawingsPaginated, getDrawingsCount, getUserIdByClerkId } from "@/db/queries";
import { createDrawingAction, deleteDrawingAction, togglePublicDrawingAction } from "@/lib/actions";
import PaginationControls from "../other/PaginationControls";
import UserBeingProcessed from "../other/UserBeingProcessed";

async function HomePageComponent({ searchParams, name, clerkId }: { searchParams: SearchParams, name: string | null, clerkId: string | null }) {
  if (!name || !clerkId) throw new Error("User not found");

  const userIdQuery = await getUserIdByClerkId(clerkId);
  if (userIdQuery.length > 0) {
    const page = searchParams["page"] ?? "1";
    const userId = userIdQuery[0].id;
    const drawings = await getAllUserDrawingsPaginated(userId, Number(page), 5);
    const numberOfDrawings = await getDrawingsCount(userId);
    const numberOfPages = Math.ceil(numberOfDrawings[0].count / 5);

    return (
      <CenterContainer size="xl">
        <Flex direction="column" align="center" justify="space-between" h="100%" gap={10}>
          <Flex p={25}>
            Hi {name}! 👋
          </Flex>
          <Group justify="center" gap={10}>
            {drawings.map((drawing, i) => <DrawingCard key={i} drawing={drawing}
              deleteAction={deleteDrawingAction}
              toggleAction={togglePublicDrawingAction}
              clerkId={clerkId} />)}
            <NewDrawingCard clerkId={clerkId} createDrawingAction={createDrawingAction} />
          </Group>
          <PaginationControls currentPage={Number(page)} numberOfPages={numberOfPages} />
        </Flex>
      </CenterContainer>
    );
  } else { // if a clerkId exists but a userId does not. Then the webhook is potentially still processing the user creation.
    return <UserBeingProcessed />; // will reload the page after 1 second
  }
};

export default HomePageComponent;
