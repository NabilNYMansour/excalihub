import { ActionIcon, Box, Button, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./landing.module.css";
import CoolButton from '../buttons/CoolButton';
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";


const highlightedTextProps = {
  fw: 700,
  span: true,
  c: "light-dark(#2A2843, #9D99C2)"
};

function ContactButtons() {
  return <Flex gap={10} align="center" justify="center" w="100%">
    <Divider my="md" size="sm" w="20%" color="light-dark(black, white)" />

    <ActionIcon size="lg" radius="md" variant="subtle" color="light-dark(black, white)"
      component="a" href="https://github.com/NabilNYMansour/excalihub" target="_blank">
      <FaGithub size={20} />
    </ActionIcon>

    <ActionIcon size="lg" radius="md" variant="subtle" color="light-dark(black, white)"
      component="a" href="https://x.com/nabilnymansour" target="_blank">
      <BsTwitterX size={20} />
    </ActionIcon>

    <Divider my="md" size="sm" w="20%" color="light-dark(black, white)" />
  </Flex>
}

const LandingHero = () => {
  return (
    <Flex maw={700} miw={100}
      direction="column" justify="center"
      align="center" gap={15} p={20}>
      <Title fw={900} p="md" c="light-dark(black, white)" fz="max(32px, min(5vw, 70px))" style={{ fontFamily: "inherit" }}>
        The Center for all of your Ideas 💡
      </Title>
      <Container>
        <Text size="lg" mt="md">
          A <Text {...highlightedTextProps} size="1.25em" className={classes.highlight} c="light-dark(black, white)"> centralized hub
          </Text> for <Text {...highlightedTextProps}>Excalidraw</Text> whiteboards
          where you can <Text {...highlightedTextProps}>collaborate</Text> with
          others, <Text {...highlightedTextProps}>share</Text> your ideas,
          and <Text {...highlightedTextProps}>organize</Text> your creative projects.
        </Text>
      </Container>

      <Flex direction="column" w="100%" gap={2} pl="md" pr="md">
        <Button
          component={Link}
          href='/sign-up'
          style={{ transition: "all 0.2s" }}
          radius="md" w="100%" size='md'>
          Get started right now! It&apos;s &nbsp;
          <Text fw={900} size="25px" c="lime" style={{ textShadow: "0 0 10px lime" }}>
            Free
          </Text>
          &nbsp;&nbsp;🤩
        </Button>
      </Flex>


      <CoolButton href="/excalidraw"
        style={{
          width: "100%", textTransform: "none", marginTop: 5,
          paddingTop: 10, paddingBottom: 10, borderRadius: 8
        }}>
        <Text fz="lg">Or Try out the <Text fw={700} fz="xl" span>Demo</Text></Text>
      </CoolButton>
      <ContactButtons />
    </Flex>
  )
}

export default LandingHero;