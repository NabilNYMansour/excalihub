import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to ExcaliHub",
  alternates: {
    canonical: `${process.env.MAIN_URL}/excalidraw`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}