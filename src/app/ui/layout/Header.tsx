"use client";

import { useEffect, useRef, useState } from 'react';
import { Badge, Container, Flex, Group, Skeleton, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import { usePathname } from 'next/navigation';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import SignInAction from '../components/buttons/SignInAction';
import { dark } from '@clerk/themes';
import { SiExcalidraw } from 'react-icons/si';
import { Loader } from '@mantine/core';

export function Header() {
  const currPath = usePathname();
  const [opened, { toggle }] = useDisclosure(false);
  const [activeLink, setActiveLink] = useState(currPath);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [checkHeader, setCheckHeader] = useState(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const prevScrollVal = useRef(0);
  const headerHover = useHover();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  useEffect(() => {
    setActiveLink(currPath);
    prevScrollVal.current = window.scrollY;
  }, [currPath]);

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

            <ClerkLoading>
              <Skeleton height={28} circle />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignInAction />
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ baseTheme: computedColorScheme === "dark" ? dark : undefined }} />
              </SignedIn>
            </ClerkLoaded>

            <Group ml="auto" mr="auto">
              <SiExcalidraw size={40} />
              <Group visibleFrom="sm">
                <h1>ExcaliHub</h1>
              </Group>
            </Group>
            <ThemeToggle />
          </Container>
        </div>
      </div>
    </header>
  );
}