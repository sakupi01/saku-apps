import { createClient } from "honox/client";
import { ReactNode } from "react";

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    // @ts-expect-error: https://github.com/honojs/honox/issues/87
    hydrateRoot(root, elem);
  },
  // @ts-expect-error: https://github.com/honojs/honox/issues/87
  createElement: async (type, props) => {
    const { createElement } = await import("react");
    return createElement(type, props);
  },
});
