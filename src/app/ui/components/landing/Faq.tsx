"use client";

import { Container, Title, Accordion, Box, Text, Skeleton, Flex } from '@mantine/core';
import classes from './Faq.module.css';
import Link from 'next/link';
import CoolButton from '../buttons/CoolButton';

export default function Faq() {
  return (
    <Container size="sm" className={classes.wrapper} w="100%">
      <Title order={2} ta="center" mb={20} size="3em" c="light-dark(black, white)">
        FAQ
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="🤔">
          <Accordion.Control><Text size='1.5em' span>🤔</Text> So what is the point of ExcaliHub, why is it made?</Accordion.Control>
          <Accordion.Panel>
            Excalidraw is very useful, but the free version doesn't let you have multiple saved drawings.
            So <Text span fw={900} c="light-dark(#2A2843, #9D99C2)">ExcaliHub</Text> was made to solve that problem.
            I needed it so I made it.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="😮">
          <Accordion.Control><Text size='1.5em' span>😮</Text> Oh so you are part of the Excali team?</Accordion.Control>
          <Accordion.Panel>
            <Text span fw={900} c="red" fz="xl">Nope :D</Text> But I would like to be...
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="👨‍💻">
          <Accordion.Control>
            <Text size='1.5em' span>👨‍💻</Text> So who are you?
          </Accordion.Control>
          <Accordion.Panel>
            My name is Nabil, I'm a software engineer. You can know more about me on
            my <Link href="https://nabilmansour.com/" target="_blank" style={{ textDecoration: "none" }}>
              website
            </Link>.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="🧐">
          <Accordion.Control><Text size='1.5em' span>🧐</Text> Are you trying to replace Excalidraw?</Accordion.Control>
          <Accordion.Panel>
            Of course not. I am making this for myself but would probably use Excalidraw if I want all the fancy features.
            This is just to have multiple drawings saved in one place. I recommend using
            the <Link href="https://plus.excalidraw.com/" target="_blank" style={{ textDecoration: "none" }}>original Excalidraw</Link> platform
            if you want the other features.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="💸">
          <Accordion.Control><Text size='1.5em' span>💸</Text> Wait so how do you make money?</Accordion.Control>
          <Accordion.Panel>
            I don't. This is a free service and will always be free.
            I made this for myself and thought others might find it useful. That being said, if you want to support me, you can

            <CoolButton href="https://buymeacoffee.com/nabilmansour"
              target='_blank'
              style={{
                width: "100%", textTransform: "none", marginTop: 15, marginBottom: 15,
                paddingTop: 10, paddingBottom: 10, borderRadius: 100, backgroundColor: "var(--mantine-color-main-filled)",
              }}>
              <Text fz="3em" fw={900}>☕️ Buy me coffee ツ</Text>
            </CoolButton>

          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="🥼">
          <Accordion.Control><Text size='1.5em' span>🥼</Text> Can I contact you or hire you?</Accordion.Control>
          <Accordion.Panel>
            You can contact me on my <Link href="https://nabilmansour.com/" target="_blank" style={{ textDecoration: "none" }}>website</Link>.
            I am generally open to do smaller projects as a freelancer or even full-time work for larger projects.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}