import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account on ExcaliHub.",
  alternates: {
    canonical: `${MAIN_URL}/sign-up`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}