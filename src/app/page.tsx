import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Box, Card, Flex, Group, Text } from "@mantine/core";
import { getUserDrawings, getUserDrawingsCount, getUserIdByClerkId } from "@/db/queries";
import { createDrawingAction, deleteDrawingAction, togglePublicDrawingAction } from "@/lib/actions";
import CenterContainer from "./ui/components/other/CenterContainer";
import SearchDrawings from "./ui/components/excaliCore/components/SearchDrawings";
import NewDrawingButton from "./ui/components/buttons/NewDrawingButton";
import DrawingCard from "./ui/components/cards/DrawingCard";
import PaginationControls from "./ui/components/other/PaginationControls";
import UserBeingProcessed from "./ui/components/other/UserBeingProcessed";
import classes from "./page.module.css";

async function HomePageComponent({ searchParams, name, clerkId }: { searchParams: SearchParams, name: string | null, clerkId: string | null }) {
  if (!name || !clerkId) throw new Error("User not found");

  const userIdQuery = await getUserIdByClerkId(clerkId);
  if (userIdQuery.length > 0) {
    const page = searchParams["page"] ?? "1";
    const searchTerm = searchParams["search"] ?? "";
    const userId = userIdQuery[0].id;
    const limit = 6
    const drawings = await getUserDrawings(userId, String(searchTerm), Number(page), limit);

    const numberOfDrawings = await getUserDrawingsCount(userId, String(searchTerm));
    const numberOfPages = Math.ceil(numberOfDrawings[0].count / limit);

    return (
      <CenterContainer size="xl">
        <Flex direction="column" align="center" h="100%" w="100%" >
          <Text p={25}>Hi {name}! 👋</Text>

          <Card className={classes.slideUp} shadow="xs" padding="md" radius="md" w="100%" maw={1108}>
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

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await currentUser();
  searchParams["page"] = searchParams["page"] ?? "1";

  if (!user) {
    redirect("/landing");
  }

  return <HomePageComponent searchParams={searchParams} name={user.fullName} clerkId={user.id} />
}
