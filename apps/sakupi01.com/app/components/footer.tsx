import { Center, Text } from "@yamada-ui/react";

export default function Footer() {
  const date = new Date();
  return (
    <Center w="full" paddingY={4}>
      <Text as="smal" color="textSubtle" fontSize="xs">
        Copyright © {date.getFullYear()} saku 🌸 All rights reserved.
      </Text>
    </Center>
  );
}
