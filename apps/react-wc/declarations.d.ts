declare module 'react/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'hello-world': { label: string };
        }
    }
    interface Node {
      getRootNode(options?: GetRootNodeOptions): Node|ShadowRoot;
    }
}