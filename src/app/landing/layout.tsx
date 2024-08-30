import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: `${MAIN_URL}/landing`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
