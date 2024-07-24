"use client";

import { Button, Container, Text, Timeline } from '@mantine/core';
import { FaQuestionCircle } from 'react-icons/fa';
import CoolButton from '@/app/ui/components/buttons/CoolButton';
import { RiLinkM } from 'react-icons/ri';
import { useMediaQuery } from '@mantine/hooks';
import { Skeleton, useComputedColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import CenterContainer from '@/app/ui/components/other/CenterContainer';
import classes from './page.module.css';
import { WELCOME_EXCALI_DATA } from '@/lib/constants';
import cx from 'clsx';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <Skeleton height="100%" width="100%" />
  },
);

function LandingExcalidraw({ isPhone }: { isPhone: boolean | undefined }) {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <div
    className={classes.drawing}
      style={{ width: "100%", height: "35vh", borderRadius: "12px", overflow: "hidden", marginTop: "25px" }}>
      <Excalidraw theme={computedColorScheme}
        UIOptions={{ tools: { image: false } }}
        initialData={{
          elements: WELCOME_EXCALI_DATA.elements as any,
          scrollToContent: true,
          appState: { zoom: { value: (isPhone ? .5 : 1) as any } }
        }} zenModeEnabled viewModeEnabled />
    </div>
  );
}

const myWebsiteLink = <Button
  component='a'
  href='https://nabilmansour.com'
  target='_blank'
  size='xs' p={1}
  variant='light'
  leftSection={<RiLinkM size={28} />}>
  <Text fw={900} span size='1.5rem'>Website</Text>
</Button>

const LandingPageComponent = () => {
  const isPhone = useMediaQuery('(max-width: 650px)');

  return (
    <CenterContainer size="md">
      <LandingExcalidraw isPhone={isPhone} />
      <CoolButton href='/excalidraw' text='Try the Demo' style={{
        backgroundImage: "linear-gradient(180deg, #ffd034, #b6871d)",
        fontSize: "1.5rem", fontWeight: "900",
      }} />
      <Container size="sm">
        <Timeline active={100} lineWidth={3} bulletSize={40}>
          <Timeline.Item bullet={<FaQuestionCircle size={28} />} title={<h2>What is Excalihub?</h2>}>
            <p>Excalihub is a platform for creating and sharing Excalidraw drawings. You can create, save, and share multiple drawings for free.</p>
            <p>To start, you just need to:</p>
            <CoolButton href='/sign-up' text='Sign up'
              style={{ backgroundImage: "linear-gradient(180deg, #6965DB, #908cff)", fontSize: "1.5rem", fontWeight: "900" }} />
            <p>Or if you already have an account:</p>
            <CoolButton href='/sign-in' text='Sign in'
              style={{ backgroundImage: "linear-gradient(180deg, #6965DB, #908cff)", fontSize: "1rem", fontWeight: "900" }} />
          </Timeline.Item>
          <Timeline.Item bullet={<div style={{ scale: "2.5" }}>🤔</div>} title={<h2>Why?</h2>}>
            <p>I find Excalidraw useful but the free version doesn&apos;t let you have multiple saved drawings. So I thought I could make that myself.</p>
          </Timeline.Item>
          <Timeline.Item bullet={<div style={{ scale: "2.5" }}>😮</div>} title={<h2>Oh so you are part of the Excali team?</h2>}>
            <Text size='1.75rem' fw={900} c="#ff0000" span>Nope :D </Text>
            <span>But I would like to be...</span>
          </Timeline.Item>
          <Timeline.Item bullet={<div style={{ scale: "2.5" }}>👨‍💻</div>} title={<h2>So who are you?</h2>}>
            <p>Just a guy. You can know more about me on my <span>
              {myWebsiteLink}
            </span></p>
            <p>One thing to note is that I am self-hosting this site. So if you find it useful consider to</p>
            <CoolButton
              href="https://buymeacoffee.com/nabilmansour"
              text="☕️ Buy me coffee ツ"
              target='_blank'
              style={{
                borderRadius: "100px",
                backgroundColor: "var(--mantine-color-main-filled)",
                textAlign: "center",
                fontSize: isPhone ? "1.25rem" : "2.5rem",
                fontWeight: 900,
              }}
            />
          </Timeline.Item>
          <Timeline.Item bullet={<div style={{ scale: "2.5" }}>🧐</div>} title={<h2>Are you trying to replace Excalidraw?</h2>}>
            <p>Of course not. I am making this for myself but would probably use Excalidraw if I want all the fancy features.
              This is just to have multiple drawings saved in one place.
              I recommend using the <a target='_blank' href='https://plus.excalidraw.com/'>
                original Excalidraw platform if you want the other features</a>.</p>
          </Timeline.Item>
          <Timeline.Item bullet={<div style={{ scale: "3.5" }}>🥼</div>} title={<h2>Feedback</h2>}>
            <p>If you have any feedback or suggestions, feel free to reach out to me on my {myWebsiteLink}
            </p>
          </Timeline.Item>
        </Timeline>
      </Container>
    </CenterContainer>
  );
};

const Page = () => {
  return <LandingPageComponent />;
};

export default Page;