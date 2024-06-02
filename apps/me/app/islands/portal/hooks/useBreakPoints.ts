import type { ResponsiveObject, StyledTheme, Theme } from "@yamada-ui/core";
import { useTheme } from "@yamada-ui/core";
import { createdDom } from "@yamada-ui/utils";
import { useEffect, useMemo, useState } from "react";

/**
 * `useBreakpoint` is a custom hook that returns the current breakpoint.
 * This hook monitors changes in the window size and returns the appropriate value.
 *
 * @see Docs https://yamada-ui.com/hooks/use-breakpoint
 */
export const useBreakpoint = () => {
  const breakpoints = {
    keys: ["base", "2xl", "xl", "lg", "md", "sm"],
    isResponsive: true,
    queries: [
      {
        breakpoint: "base",
        minW: 1441,
        maxW: undefined,
        query: undefined,
        maxWQuery: undefined,
        minWQuery: "@media screen and (min-width: 1441px)",
        minMaxQuery: "@media screen and (min-width: 1441px)",
      },
      {
        breakpoint: "2xl",
        minW: 1281,
        maxW: 1440,
        query: "@media screen and (max-width: 1440px)",
        maxWQuery: "@media screen and (max-width: 1440px)",
        minWQuery: "@media screen and (min-width: 1281px)",
        minMaxQuery:
          "@media screen and (min-width: 1281px) and (max-width: 1440px)",
      },
      {
        breakpoint: "xl",
        minW: 977,
        maxW: 1280,
        query: "@media screen and (max-width: 1280px)",
        maxWQuery: "@media screen and (max-width: 1280px)",
        minWQuery: "@media screen and (min-width: 977px)",
        minMaxQuery:
          "@media screen and (min-width: 977px) and (max-width: 1280px)",
      },
      {
        breakpoint: "lg",
        minW: 769,
        maxW: 976,
        query: "@media screen and (max-width: 976px)",
        maxWQuery: "@media screen and (max-width: 976px)",
        minWQuery: "@media screen and (min-width: 769px)",
        minMaxQuery:
          "@media screen and (min-width: 769px) and (max-width: 976px)",
      },
      {
        breakpoint: "md",
        minW: 481,
        maxW: 768,
        query: "@media screen and (max-width: 768px)",
        maxWQuery: "@media screen and (max-width: 768px)",
        minWQuery: "@media screen and (min-width: 481px)",
        minMaxQuery:
          "@media screen and (min-width: 481px) and (max-width: 768px)",
      },
      {
        breakpoint: "sm",
        minW: undefined,
        maxW: 480,
        query: "@media screen and (max-width: 480px)",
        maxWQuery: "@media screen and (max-width: 480px)",
        minWQuery: undefined,
        minMaxQuery: "@media screen and (max-width: 480px)",
      },
    ],
  };

  if (!breakpoints)
    throw Error(
      "useBreakpoint: `breakpoints` is undefined. Seems you forgot to put theme in `breakpoints`",
    );

  const queries = useMemo(
    () =>
      breakpoints.queries.map(({ breakpoint, minMaxQuery }) => ({
        breakpoint,
        query: minMaxQuery?.replace("@media screen and ", "") ?? "",
      })),
    [breakpoints],
  );

  const [breakpoint, setBreakpoint] = useState(() => {
    const isBrowser = createdDom();

    if (!isBrowser) return "base";

    for (const { breakpoint, query } of queries) {
      const mql = window.matchMedia(query);

      if (mql.matches) return breakpoint;
    }
  });

  useEffect(() => {
    const observer = queries.map(({ breakpoint, query }): (() => void) => {
      const mql = window.matchMedia(query);

      const onChange = (e: MediaQueryListEvent) => {
        if (e.matches) setBreakpoint(breakpoint);
      };

      if (typeof mql.addEventListener === "function")
        mql.addEventListener("change", onChange);

      return () => {
        if (typeof mql.removeEventListener === "function")
          mql.removeEventListener("change", onChange);
      };
    });

    return () => {
      for (const unobserve of observer) unobserve();
    };
  }, [queries]);

  return breakpoint as Theme["breakpoints"];
};

/**
 * `useBreakpointValue` is a custom hook that returns the value of the current breakpoint from the provided object.
 * This hook monitors changes in the window size and returns the appropriate value.
 *
 * @see Docs https://yamada-ui.com/hooks/use-breakpoint-value
 */
export const useBreakpointValue = <T>(values: ResponsiveObject<T>): T => {
  const { theme } = useTheme();
  const breakpoint = useBreakpoint();

  return getBreakpointValue<T>(values)(theme, breakpoint);
};

export const getBreakpointValue =
  <T>(values: ResponsiveObject<T>) =>
  (theme: StyledTheme, breakpoint: Theme["breakpoints"]): T => {
    if (!theme)
      throw Error(
        "useBreakpoint: `theme` is undefined. Seems you forgot to wrap your app in `<UIProvider />`",
      );

    const breakpoints = theme.__breakpoints?.keys;

    if (!breakpoints)
      throw Error(
        "useBreakpoint: `breakpoints` is undefined. Seems you forgot to put theme in `breakpoints`",
      );

    const currentIndex = breakpoints.indexOf(breakpoint);

    for (let i = currentIndex; 0 < i; i--) {
      const nextBreakpoint = breakpoints[i];

      if (nextBreakpoint && Object.hasOwn(values, nextBreakpoint)) {
        return values[nextBreakpoint] as T;
      }
    }

    return values.base as T;
  };
