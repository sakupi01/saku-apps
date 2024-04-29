import { Heading, Stack } from "@yamada-ui/react";
import { Image } from "@yamada-ui/react";
export default function Header() {
  return (
    <Stack direction={{ base: "column" }} alignItems="center" gap="0">
      <Image src="/static/icon.png" size="70" />
      <Heading color="textBase" as="h2" size="3xl" isTruncated>
        saku
      </Heading>
      <Heading color="lightTextBase" as="h3" size="md" isTruncated>
        Web(Frontend) Engineer
      </Heading>
    </Stack>
  );
}
