import CenterContainer from "../other/CenterContainer";
import DrawingCard from "../cards/DrawingCard";
import NewDrawingCard from "../cards/NewDrawingCard";
import { Group } from "@mantine/core";
import { getAllUserDrawingsPaginatedGivenClerkId } from "@/db/queries";
import { createDrawingAction } from "@/lib/actions";

async function HomePageComponent({ name, clerkId }: { name: string | null, clerkId: string | null }) {
  if (!name || !clerkId) throw new Error("User not found");

  const drawings = await getAllUserDrawingsPaginatedGivenClerkId(clerkId, 0, 10);
  console.log(drawings);

  return (
    <CenterContainer size="xl">
      Hi {name}!
      <Group justify="center" gap={10}>
        {drawings.map((drawing, i) => <DrawingCard key={i} drawing={drawing} />)}
        <NewDrawingCard clerkId={clerkId} createDrawingAction={createDrawingAction} />
      </Group>
    </CenterContainer>
  );
};

export default HomePageComponent;
