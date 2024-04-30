import { GridItem, GridItemProps } from "@yamada-ui/react";
import { PropsWithChildren } from "react";

interface ItemProps {
  gradColor: string;
  url?: string;
}
export default function PortalGridChild({
  gradColor,
  url,
  children,
  ...props
}: PropsWithChildren<ItemProps & GridItemProps>) {
  return (
    <GridItem
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
      <a href={url} target="_blank">
        {children}
      </a>
    </GridItem>
  );
}
