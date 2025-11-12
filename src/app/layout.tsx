import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Header } from "./ui/layout/Header";
import { Footer } from "./ui/layout/Footer";
import classes from "./home.module.css";
import localFont from 'next/font/local';
import cx from 'clsx';
import { theme } from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";
import { APP_DESCRIPTION, MAIN_URL } from "@/lib/constants";
import { CLERK_AVAILABLE } from "@/auth";
import { Analytics } from '@vercel/analytics/next';

const CaviarDreams = localFont({ src: '../../public/CaviarDreams.ttf' });

const description = APP_DESCRIPTION;
const title = "Excalihub";
const author = "Nabil Mansour";
const keywords = "Excalihub, Excalidraw, drawings, sharing, platform, Nabil Mansour, open source, free";
const imageLink = `${MAIN_URL}/ExcalihubLogoTitle.png`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | " + title,
  },
  description: description,
  alternates: {
    canonical: `${MAIN_URL}`
  },
  keywords: keywords,
  openGraph: {
    title: title,
    description: description,
    url: `${MAIN_URL}`,
    type: "website",
    images: [{ url: imageLink, alt: title, }],
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [imageLink],
  },
  authors: { name: author },
  creator: author,
  publisher: author,
  manifest: `${MAIN_URL}/manifest.json`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript defaultColorScheme="dark" />
          <link rel="shortcut icon" href={`/favicon.ico`} />
          <link rel="apple-touch-icon" href={`/favicon.ico`} />
          <meta name="google-site-verification" content="AMluj1U5uMb5jWgvVl_0_UPmpTVreGhIrB6wiK_1AuQ" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes" />
        </head>
        <body className={cx(classes.body, CaviarDreams.className)}>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Notifications className={classes.notifications} />
            <Header useClerk={CLERK_AVAILABLE} />
            <div className={classes.app}>
              {children}
            </div>
            <Footer />
          </MantineProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
