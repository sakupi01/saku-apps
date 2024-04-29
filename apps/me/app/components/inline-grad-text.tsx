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
          cursor: "pointer",
        }}
        {...props}
      >
        {children}
      </Text>
    </a>
  );
}
