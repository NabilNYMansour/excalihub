import { ActionIcon, Box, Button, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./landing.module.css";
import CoolButton from '../buttons/CoolButton';
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
        <CoolButton href="/sign-up"
          style={{
            width: "100%", textTransform: "none", marginTop: 5, fontWeight: 900, textAlign: "center",
            paddingTop: 10, paddingBottom: 10, borderRadius: 8, backgroundColor: "var(--mantine-color-main-filled)"
          }}>
          Get started right now! It&apos;s &nbsp;
          <Text span fw={900} size="25px" c="lime" style={{ textShadow: "0 0 10px lime" }}>
            Free
          </Text>
          &nbsp;&nbsp;🤩
        </CoolButton>
      </Flex>

      <CoolButton href="/excalidraw"
        style={{
          width: "100%", textTransform: "none", marginTop: 5,
          paddingTop: 10, paddingBottom: 10, borderRadius: 8
        }}>
        <Text fz="lg">Or Try out the <Text fw={700} fz="xl" span>Demo</Text></Text>
      </CoolButton>
      <ContactButtons />
      <a href="https://www.producthunt.com/posts/excalihub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-excalihub" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=485726&theme=dark" alt="ExcaliHub - The&#0032;Center&#0032;for&#0032;all&#0032;of&#0032;your&#0032;Ideas&#0032;💡 | Product Hunt" width="250" height="54" /></a>
    </Flex>
  )
}

export default LandingHero;