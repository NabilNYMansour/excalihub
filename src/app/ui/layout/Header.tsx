"use client";

import { useEffect, useRef, useState } from 'react';
import { Container, Group, Skeleton, useComputedColorScheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import SignInAction from '../components/buttons/SignInAction';
import { dark } from '@clerk/themes';
import { SiExcalidraw } from 'react-icons/si';
import Link from 'next/link';

const ClerkItem = ({ computedColorScheme }: { computedColorScheme: "dark" | "light" }) => {
  return (
    <div style={{ scale: "1.25" }} >
      <ClerkLoading>
        <Skeleton height={28} circle />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInAction />
        </SignedOut>
        <SignedIn>
          <UserButton aria-label="Authenticator" userProfileMode='navigation' userProfileUrl='/user-profile' appearance={{
            baseTheme: computedColorScheme === "dark" ? dark : undefined,
          }} />
        </SignedIn>
      </ClerkLoaded>
    </div>
  )
}

export function Header() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [checkHeader, setCheckHeader] = useState(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const prevScrollVal = useRef(0);
  const headerHover = useHover();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-80%)',
    transition: "transform ease 0.25s"
  };

  return (
    <header>
      <div ref={headerHover.ref} className={classes.rootHeader}>
        <div className={classes.header} style={slideUp} >
          <Container size="xl" className={classes.inner}>

            <Group w="33%">
              <ClerkItem computedColorScheme={computedColorScheme} />
            </Group>

            <Link href="/" className={classes.appTitle}>
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