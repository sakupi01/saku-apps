declare module "mdast-util-heading-range" {
  function heading(
    node: any,
    test: any,
    callback: (start: any, nodes: any, end: any) => any[],
  ): void;
  export = heading;
}

declare module "mdast-util-to-string" {
  function toString(node: any): string;
  export = toString;
}

declare module "remarkCollapse" {
  interface Options {
    test: any;
    summary?: string | (() => string);
  }
}

declare function remarkCollapse(
  options: remarkCollapse.Options,
): (tree: import("mdast").Root) => Promise<import("mdast").Root>;

export = remarkCollapse;
