import { Container } from "@mantine/core";
import globalClasses from "./globals.module.css";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "./ui/components/LandingPage";
// import { createUser, getUserById } from "@/db/queries";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <Container size="lg" className={globalClasses.centerContainer}>
      {user ? <div>Hello {user.fullName}</div> : <LandingPage />}
    </Container>
  );
}
