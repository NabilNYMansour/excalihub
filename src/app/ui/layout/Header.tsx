"use client";

import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Container, Group, Skeleton, Text, Tooltip, useComputedColorScheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import SignInAction from '../components/buttons/SignInAction';
import { dark } from '@clerk/themes';
import { SiExcalidraw } from 'react-icons/si';
import { DEVELOPER_URL, GITHUB_URL } from '../components/other/Constants';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';

const DeveloperAction =
  () => (
    <Tooltip withArrow openDelay={750}
      label={<Text fz="xs" lh="md">Developer</Text>}>
      <ActionIcon
        component="a"
        href={DEVELOPER_URL}
        target='_blank'
        color='#5a586f'
        variant='filled' size="xl">
        <Image style={{ borderRadius: "500px" }} src="/tree.ico" alt="Nabil Mansour" width={30} height={30} />
      </ActionIcon>
    </Tooltip>
  );

const GitHubAction =
  () => (
    <Tooltip withArrow openDelay={750}
      label={<Text fz="xs" lh="md">GitHub Repo</Text>}>
      <ActionIcon
        component="a"
        href={GITHUB_URL}
        aria-label="GitHub Repo"
        target='_blank'
        variant='default' size="xl">
        <AiFillGithub size="2em" />
      </ActionIcon>
    </Tooltip>
  );

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
              <div style={{ scale: "1.25" }} >
                <ClerkLoading>
                  <Skeleton height={28} circle />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedOut>
                    <SignInAction />
                  </SignedOut>
                  <SignedIn>
                    <UserButton aria-label="Authenticator" appearance={{ baseTheme: computedColorScheme === "dark" ? dark : undefined }} />
                  </SignedIn>
                </ClerkLoaded>
              </div>
            </Group>

            <a href="/landing" className={classes.appTitle}>
              <Group ml="auto" mr="auto" c="main">
                <SiExcalidraw size={40} />
                <Group visibleFrom="sm">
                  <h1>ExcaliHub</h1>
                </Group>
              </Group>
            </a>

            {/* PC */}
            <Group justify='right' align='center' gap={10} w="33%" visibleFrom='xs'>
              <DeveloperAction />
              <GitHubAction />
              <ThemeToggle />
            </Group>

            {/* Phone */}
            <Group justify='right' align='center' w="33%" hiddenFrom='xs'>
              <ThemeToggle />
            </Group>

          </Container>
        </div>
      </div>
    </header>
  );
}