import Header from "@/components/header";
import { SlideFade, Stack } from "@yamada-ui/react";
import Intro from "./intro";

export default function Content() {
  return (
    <Stack
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
        <Header />
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
        <Intro />
      </SlideFade>
    </Stack>
  );
}
