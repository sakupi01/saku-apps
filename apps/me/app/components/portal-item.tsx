import { Box, BoxProps, Tooltip } from "@yamada-ui/react";
import { PropsWithChildren } from "react";

interface ItemProps {
  gradColor: string;
  url?: string;
  isAvailable?: boolean;
}
export default function PortalItem({
  gradColor,
  url,
  children,
  isAvailable = true,
  ...props
}: PropsWithChildren<ItemProps & BoxProps>) {
  if (!isAvailable) {
    return (
      <Tooltip
        label="Currently under construction..."
        placement="bottom"
        animation="top"
      >
        <Box
          w="full"
          aspectRatio="1/1"
          p="md"
          rounded="40"
          color="white"
          bg={"transparent"}
          borderWidth={2}
          borderColor="textBase"
          borderStyle="solid"
          display="flex"
          alignItems="center"
          justifyContent="center"
          as="button"
          _hover={{
            background: "gray.100",
          }}
          {...props}
        >
          <a
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            tabIndex={-1}
          >
            {children}
          </a>
        </Box>
      </Tooltip>
    );
  }
  return (
    <Box
      w="full"
      aspectRatio="1/1"
      p="md"
      rounded="40"
      color="white"
      bg={"transparent"}
      borderWidth={2}
      borderColor="textBase"
      borderStyle="solid"
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="button"
      _hover={{
        background: gradColor,
      }}
      {...props}
    >
      <a
        href={url}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </a>
    </Box>
  );
}
