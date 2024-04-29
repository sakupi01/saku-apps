import { useState } from "react";
import { Box, Button, Heading } from "@yamada-ui/react";

export default function Counter({ initVal }: { initVal: number }) {
  const [count, setCount] = useState(initVal);
  return (
    <div>
      <Heading w="full" size="2xl" bg="purple.500" bgClip="text" isTruncated>
        {count}
      </Heading>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Box p="md" rounded="md" bg="primary" color="white">
        This is the Box
      </Box>
    </div>
  );
}
