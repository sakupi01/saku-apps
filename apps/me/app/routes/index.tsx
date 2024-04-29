import { createRoute } from "honox/factory";
import { Stack } from "@yamada-ui/react";
import Portal from "@/islands/portal";
import Header from "../components/header";
import Intro from "@/islands/intro";

export default createRoute((c) => {
  return c.render(
    <Stack
      direction={{ base: "column" }}
      paddingY="8%"
      paddingX={{ base: "20%", sm: "10%", xl: "15%" }}
      gap="50"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Header />
      <Stack direction={{ base: "column" }} gap="70">
        <Intro />
        <Portal />
      </Stack>
    </Stack>,
  );
});
