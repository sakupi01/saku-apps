import InlineGradText from "@/components/inline-grad-text";
import { Stack, Text } from "@yamada-ui/react";

export default function Intro() {
  return (
    <Stack color="lightTextBase" position={"relative"} zIndex={"beerus"}>
      <Text as="b" color="lightTextBase">
        Hi, I’m saku. 👋🏻
      </Text>
      <Text as="b">
        This is my{" "}
        <InlineGradText
          url={"/"}
          gradColor="linear-gradient(90deg, #FF8383, #9796F0)"
        >
          portfolio site
        </InlineGradText>
        .{" "}
      </Text>
      <Text as="b">I work as a Web Frontend Engineer. </Text>
      <Text as="b">
        I publish technical articles on either{" "}
        <InlineGradText
          url={import.meta.env.VITE_ZENN_URL}
          gradColor="linear-gradient(90deg, #7ABBF7, #9796F0)"
        >
          Zenn
        </InlineGradText>{" "}
        or{" "}
        <InlineGradText
          url={import.meta.env.VITE_TECH_BLOG_URL}
          gradColor="linear-gradient(90deg, #FF6E7F, #FFE259)"
        >
          my tech blog
        </InlineGradText>
        .{" "}
      </Text>
      <Text as="b">
        I write my personal stuff on{" "}
        <InlineGradText
          url={import.meta.env.VITE_LIFE_BLOG_URL}
          gradColor="linear-gradient(90deg, #4BC0C8, #F7BB97)"
        >
          my life blog
        </InlineGradText>
        .{" "}
      </Text>
      <Text as="b">
        You can find me on{" "}
        <InlineGradText
          url={import.meta.env.VITE_GITHUB_URL}
          gradColor="linear-gradient(90deg, #273045, #9747FF)"
        >
          GitHub
        </InlineGradText>
        ,{" "}
        <InlineGradText
          url={import.meta.env.VITE_X_URL}
          gradColor="linear-gradient(90deg, #273045, #5d8bf7)"
        >
          X(Twitter)
        </InlineGradText>
        , or{" "}
        <InlineGradText
          url={import.meta.env.VITE_INSTAGRAM_URL}
          gradColor="linear-gradient(90deg, #e507cf, #9747FF)"
        >
          Instagram
        </InlineGradText>
        .
      </Text>
    </Stack>
  );
}
