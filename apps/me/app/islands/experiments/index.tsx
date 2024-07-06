import InlineGradText from "@/components/inline-grad-text";
import { Heading, SlideFade, Stack, Text } from "@yamada-ui/react";

export default function Experiments() {
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
            Experiments
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
        <Stack w={"100%"} color="lightTextBase" gap={0}>
          <Heading color="textBase" as="h3" size="lg" isTruncated>
            <InlineGradText
              url={import.meta.env.VITE_EXPERIMENTS_GIT_KUSA_APP_URL}
              gradColor="linear-gradient(90deg, #24be5b, #ffbe64)"
            >
              Git Kusa App
            </InlineGradText>
          </Heading>
          <Text fontSize="sm" as="b" lineHeight={2} color="lightTextBase">
            Git Kusa(草) App is a web app that allows you to investigate and
            print out the contribution activities of anyone in GitHub🪴
          </Text>
          <Text fontSize="xs" lineHeight={2} color="lightTextBase">
            Built with: Remix, GraphQL, React, TypeScript, Tailwind CSS, Vercel
          </Text>
        </Stack>
      </SlideFade>

      {/* <SlideFade
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
            <InlineGradText
              url={import.meta.env.VITE_EXPERIMENTS_GIT_KUSA_APP_URL}
              gradColor="linear-gradient(90deg, #24be5b, #ffbe64)"
            >
              Git Kusa App
            </InlineGradText>
          </Heading>
          <Text fontSize="sm" as="b" lineHeight={2} color="lightTextBase">
            Git Kusa(草) App is a web app that allows you to investigate and
            print out the contribution activities of anyone in GitHub🪴
          </Text>
          <Text fontSize="xs" lineHeight={2} color="lightTextBase">
            Built with: Remix, GraphQL, React, TypeScript, Tailwind CSS, Vercel
          </Text>
        </Stack>
      </SlideFade> */}

      {/* <SlideFade
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
            <InlineGradText
              url={import.meta.env.VITE_EXPERIMENTS_GIT_KUSA_APP_URL}
              gradColor="linear-gradient(90deg, #24be5b, #ffbe64)"
            >
              Git Kusa App
            </InlineGradText>
          </Heading>
          <Text fontSize="sm" as="b" lineHeight={2} color="lightTextBase">
            Git Kusa(草) App is a web app that allows you to investigate and
            print out the contribution activities of anyone in GitHub🪴
          </Text>
          <Text fontSize="xs" lineHeight={2} color="lightTextBase">
            Built with: Remix, GraphQL, React, TypeScript, Tailwind CSS, Vercel
          </Text>
        </Stack>
      </SlideFade> */}
    </Stack>
  );
}
