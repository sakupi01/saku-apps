import Header from "@/components/header";
import { Stack } from "@yamada-ui/react";
import Intro from "./intro";

export default function Content() {
  return (
    <Stack
      direction={{ base: "column" }}
      paddingY="8%"
      paddingX={{ base: "20%", sm: "10%", xl: "15%" }}
      gap="50"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Header />
      <Intro />
    </Stack>
  );
}
