"use client";

import { useEffect, useRef, useState } from 'react';
import { Button, Container, Group, Skeleton, ThemeIcon, useComputedColorScheme } from '@mantine/core';
import { useHover, useLocalStorage } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import { UserButton, ClerkLoading, ClerkLoaded, SignedOut, SignedIn } from '@clerk/nextjs';
import SignInAction from '../components/buttons/SignInAction';
import { dark } from '@clerk/themes';
import { SiExcalidraw } from 'react-icons/si';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";

const ClerkItem = ({
  computedColorScheme,
  useClerk,
}: {
  computedColorScheme: "dark" | "light",
  useClerk: boolean,
}) => {
  return (
    <div style={{ scale: "1.25" }}>
      {useClerk ?
        <>
          <ClerkLoading>
            <Skeleton height={28} circle />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInAction />
            </SignedOut>
            <SignedIn>
              <UserButton aria-label="Authenticator" userProfileMode='navigation' userProfileUrl='/user-profile'
                appearance={{
                  baseTheme: computedColorScheme === "dark" ? dark : undefined,
                }}
              />
            </SignedIn>
          </ClerkLoaded>
        </>
        : <ThemeIcon aria-label="Authenticator" variant="light" radius="xl" size={28}>
          <FaUser size={15} />
        </ThemeIcon>
      }
    </div>
  )
}

const JsoneerBanner = ({ closed, setClosed }: { closed: boolean, setClosed: (close: boolean) => void }) => {
  if (closed) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 80,
          zIndex: 20,
          color: "#100F28",
          borderBottomLeftRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.95rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "background 0.2s, color 0.2s",
        }}
        onClick={() => setClosed(false)}
        aria-label="Show banner"
      >
        <img
          src="jsoneer.png"
          alt="JSONeer"
          style={{
            height: "22px",
            borderRadius: "4px",
            marginRight: "6px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #100F28 70%, #23234a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: closed ? "0" : "0.75rem 0",
        borderBottom: "1px solid #23234a",
        boxShadow: closed ? "none" : "0 2px 12px rgba(8,6,35,0.10)",
        height: closed ? "0px" : "auto",
        overflow: "hidden",
        transition: "height 0.3s, padding 0.3s, box-shadow 0.3s",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Container
        size="xl"
        className={classes.inner}
        style={{
          color: "#e0e0ff",
          fontSize: "1.05rem",
          textAlign: "center",
          letterSpacing: "0.01em",
          fontWeight: 500,
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          position: "relative",
        }}
      >
        <Group visibleFrom="sm">
          <span>
            If you liked&nbsp;<b>ExcaliHub</b>,
          </span>
        </Group>
        <Group>
          checkout&nbsp;
        </Group>
        <Link
          href="https://jsoneer.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4fd1c5",
            fontWeight: 600,
            transition: "color 0.2s",
            fontSize: "1.15rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            paddingLeft: "0.5rem",
          }}
        >
          <img
            src="jsoneer.png"
            alt="JSONeer"
            style={{
              height: "36px",
              verticalAlign: "middle",
              borderRadius: "8px",
              transition: "box-shadow 0.2s, transform 0.2s",
              padding: "0.15rem",
              boxShadow: "0 1px 6px rgba(56,178,172,0.10)",
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = "0 2px 16px rgba(56,178,172,0.30)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = "0 1px 6px rgba(56,178,172,0.10)";
            }}
          />
        </Link>
      </Container>
      <Button
        aria-label="Close banner"
        onClick={() => setClosed(true)}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          border: "none",
          color: "#e0e0ff",
          fontSize: "1rem",
          cursor: "pointer",
          height: "28px",
          width: "28px",
          padding: "0",
          borderRadius: "6px",
          lineHeight: 1,
          transition: "background 0.2s, color 0.2s",
        }}
        variant='subtle'
        onMouseOver={e => {
          e.currentTarget.style.background = "#4fd1c5";
          e.currentTarget.style.color = "#100F28";
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.color = "#e0e0ff";
        }}
      >
        <IoMdClose />
      </Button>
    </div>
  );
};

export function Header({
  useClerk,
}: {
  useClerk: boolean
}) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [checkHeader, setCheckHeader] = useState(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const prevScrollVal = useRef(0);
  const headerHover = useHover();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const [closed, setClosed] = useLocalStorage({
    key: 'jsoneer-banner-closed',
    defaultValue: false,
  });

  const handleScroll = () => {
    if (window.scrollY < 350) {
      setHeaderVisible(true);
    }

    if (window.scrollY < prevScrollVal.current || window.scrollY < 350) {
      setScrollDir('up');
    } else {
      setScrollDir('down');
    }
    if (Math.abs(window.scrollY - prevScrollVal.current) > 300) {
      prevScrollVal.current = window.scrollY;
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalID = setTimeout(() => {
      if (scrollDir === 'down') {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setCheckHeader(!checkHeader);
    }, 200);
    return () => clearInterval(intervalID);
  }, [checkHeader, scrollDir]);

  useEffect(() => {
    setScrollDir("up");
  }, [headerHover.hovered]);

  const slideUp = {
    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-90%)',
    transition: "transform ease 0.25s"
  };

  return (
    <header style={{ marginBottom: closed ? 0 : "3.5rem" }}>
      <div ref={headerHover.ref} className={classes.rootHeader}>
        <div className={classes.header} style={slideUp}>
          <JsoneerBanner closed={closed} setClosed={setClosed} />
          <Container size="xl" className={classes.inner}>

            <Group w="33%">
              <ClerkItem computedColorScheme={computedColorScheme} useClerk={useClerk} />
            </Group>

            <Link href="/home" className={classes.appTitle}>
              <Group ml="auto" mr="auto" c="main">
                <SiExcalidraw size={40} aria-label="Excalidraw" />
                <Group visibleFrom="sm">
                  <h1>ExcaliHub</h1>
                </Group>
              </Group>
            </Link>

            <Group justify='right' align='center' w="33%">
              <ThemeToggle />
            </Group>

          </Container>
        </div>
      </div>
    </header>
  );
}