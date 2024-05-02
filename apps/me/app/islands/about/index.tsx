import InlineGradText from "@/components/inline-grad-text";
import { SlideFade, Heading, Stack, Text } from "@yamada-ui/react";

export default function About() {
  return (
    <Stack
      w={"100%"}
      direction={{ base: "column" }}
      paddingY="8%"
      paddingX={{ base: "35%", sm: "10%", xl: "30%" }}
      gap="50"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <SlideFade
        isOpen={true}
        duration={0.5}
        offsetY={-20}
        unmountOnExit
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack w={"100%"} direction={"column"} alignItems="center" gap="0">
          <Heading color="textBase" as="h2" size="3xl" isTruncated>
            About
          </Heading>
        </Stack>
      </SlideFade>

      <SlideFade
        isOpen={true}
        duration={0.7}
        offsetY={-50}
        unmountOnExit
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack w={"100%"} color="lightTextBase">
          <Text as="b" lineHeight={2}>
            Hi, it's saku. 👋🏻
          </Text>
          <Text as="b" lineHeight={2}>
            I work as a Web Frontend Engineer, especially having a deep interest
            in React and TypeScript. The carrier has just started.
          </Text>
          <Text as="b" lineHeight={2}>
            I studied Computer Science at my Japanese University, as well as a
            little bit about UI/UX and Enterprise Web Application Development at
            my Australian University.
          </Text>
        </Stack>
      </SlideFade>

      <SlideFade
        isOpen={true}
        duration={1}
        offsetY={-50}
        unmountOnExit
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack w={"100%"} direction={"column"} gap="0">
          <Heading color="textBase" as="h3" size="lg" isTruncated>
            Personal Life
          </Heading>
          <Text as="b" lineHeight={2} color="lightTextBase">
            In order to know the world, country, its people, its culture, and
            myself, I travel.{" "}
          </Text>

          <Text as="b" lineHeight={2} color="lightTextBase">
            I’m obsessed with coffee as well.
          </Text>
        </Stack>
      </SlideFade>

      <SlideFade
        isOpen={true}
        duration={1.2}
        offsetY={-50}
        unmountOnExit
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack w={"100%"} direction={"column"} gap="0">
          <Heading color="textBase" as="h3" size="lg" isTruncated>
            Contact
          </Heading>
          <Text as="b" lineHeight={2} color="lightTextBase">
            You can get in touch with me via{" "}
            <InlineGradText
              url={import.meta.env.VITE_MAIL_URL}
              gradColor="linear-gradient(90deg, #FF8383, #9796F0)"
            >
              email
            </InlineGradText>
            , or{" "}
            <InlineGradText
              url={import.meta.env.VITE_X_URL}
              gradColor="linear-gradient(90deg, #273045, #5d8bf7)"
            >
              X(Twitter)
            </InlineGradText>
            .
          </Text>
        </Stack>
      </SlideFade>
    </Stack>
  );
}
