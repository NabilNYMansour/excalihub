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

const CaviarDreams = localFont({ src: '../../public/CaviarDreams.ttf' });

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
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </head>
        <body className={cx(classes.body, CaviarDreams.className)}>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Notifications className={classes.notifications} />
            <Header />
            <div className={classes.app}>
              {children}
            </div>
            <Footer />
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
