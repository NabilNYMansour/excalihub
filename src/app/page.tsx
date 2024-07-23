import { currentUser } from "@clerk/nextjs/server";
import LandingPageComponent from "./ui/components/pages/LandingPageComponent";
import HomePageComponent from "./ui/components/pages/HomePageComponent";
import { redirect } from "next/navigation";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await currentUser();
  searchParams["page"] = searchParams["page"] ?? "1";

  if (!user) {
    redirect("/landing");
  }

  return <HomePageComponent searchParams={searchParams} name={user.fullName} clerkId={user.id} />
}
