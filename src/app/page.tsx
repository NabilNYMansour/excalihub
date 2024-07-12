import { currentUser } from "@clerk/nextjs/server";
import LandingPageComponent from "./ui/components/pages/LandingPageComponent";
import HomePageComponent from "./ui/components/pages/HomePageComponent";

export default async function HomePage() {
  const user = await currentUser();

  return user ? <HomePageComponent name={user.fullName} clerkId={user.id}/> : <LandingPageComponent />
}
