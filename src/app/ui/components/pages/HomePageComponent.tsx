import CenterContainer from "../other/CenterContainer";
import DrawingCard from "../cards/DrawingCard";
import NewDrawingCard from "../cards/NewDrawingCard";
import { Flex, Group } from "@mantine/core";
import { getAllUserDrawingsPaginatedGivenClerkId, getDrawingsCountGivenClerkId } from "@/db/queries";
import { createDrawingAction, deleteDrawingAction, togglePublicDrawingAction } from "@/lib/actions";
import PaginationControls from "../other/PaginationControls";

async function HomePageComponent({ searchParams, name, clerkId }: { searchParams: SearchParams, name: string | null, clerkId: string | null }) {
  if (!name || !clerkId) throw new Error("User not found");

  const page = searchParams["page"] ?? "1";
  const drawings = await getAllUserDrawingsPaginatedGivenClerkId(clerkId, Number(page), 5);
  const numberOfDrawings = await getDrawingsCountGivenClerkId(clerkId);
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
            toggleAction={togglePublicDrawingAction} />)}
          <NewDrawingCard clerkId={clerkId} createDrawingAction={createDrawingAction} />
        </Group>
        <PaginationControls currentPage={Number(page)} numberOfPages={numberOfPages} />
      </Flex>
    </CenterContainer>
  );
};

export default HomePageComponent;
