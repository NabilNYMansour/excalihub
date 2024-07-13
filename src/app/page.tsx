import { currentUser } from "@clerk/nextjs/server";
import LandingPageComponent from "./ui/components/pages/LandingPageComponent";
import HomePageComponent from "./ui/components/pages/HomePageComponent";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await currentUser();
  searchParams["page"] = searchParams["page"] ?? "1";

  return user ?
    <HomePageComponent
      searchParams={searchParams}
      name={user.fullName}
      clerkId={user.id} /> :
    <LandingPageComponent />
}
