import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of Service  and Privacy Policy for Excalihub web app.",
  alternates: {
    canonical: `${process.env.MAIN_URL}/terms`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
