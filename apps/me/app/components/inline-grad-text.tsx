import { Text, TextProps } from "@yamada-ui/react";

interface InlineGradTextProps {
  url: string;
  gradColor: string;
}
export default function InlineGradText({
  children,
  gradColor,
  url,
  ...props
}: InlineGradTextProps & TextProps) {
  return (
    <a href={url} target="_blank">
      <Text
        as="span"
        bg={gradColor}
        bgClip="text"
        _hover={{
          background: gradColor,
          cursor: "pointer",
          color: "white",
        }}
        transitionDuration="0.3s"
        transitionProperty={"all"}
        suppressHydrationWarning
        {...props}
      >
        {children}
      </Text>
    </a>
  );
}
