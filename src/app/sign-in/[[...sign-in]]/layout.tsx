import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account on ExcaliHub.",
  alternates: {
    canonical: `${MAIN_URL}/sign-in`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}