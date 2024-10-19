import InlineGradText from "@/components/inline-grad-text";
import { Stack, Text } from "@yamada-ui/react";

export default function Intro() {
  return (
    <Stack color="lightTextBase" position={"relative"} zIndex={"beerus"}>
      <Text as="b" lineHeight={2}>
        Hi, it's saku. 👋🏻
      </Text>
      <Text as="b" lineHeight={2}>
        This is my{" "}
        <InlineGradText
          url={"/"}
          gradColor="linear-gradient(90deg, #FF8383, #9796F0)"
        >
          portfolio site
        </InlineGradText>
        .{" "}
      </Text>
      <Text as="b" lineHeight={2}>
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
        , and here's{" "}
        <InlineGradText
          url={import.meta.env.VITE_TECH_BLOG_URL}
          gradColor="linear-gradient(90deg, #86ff6e, #e159ff)"
        >
          my slides
        </InlineGradText>{" "}
        to use when I give talks at conferences and meetups.
      </Text>
      <Text as="b" lineHeight={2}>
        I write my personal stuff on{" "}
        <InlineGradText
          url={import.meta.env.VITE_LIFE_BLOG_URL}
          gradColor="linear-gradient(90deg, #4BC0C8, #F7BB97)"
        >
          my life blog
        </InlineGradText>
        .{" "}
      </Text>
      <Text as="b" lineHeight={2}>
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
