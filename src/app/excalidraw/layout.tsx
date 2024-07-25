import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to ExcaliHub",
  alternates: {
    canonical: `${MAIN_URL}/excalidraw`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}