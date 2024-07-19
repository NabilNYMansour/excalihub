import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing",
  alternates: {
    canonical: `${process.env.MAIN_URL}/landing`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
