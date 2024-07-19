import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy Policy for Excalihub web app.",
  alternates: {
    canonical: `${process.env.MAIN_URL}/privacy`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
