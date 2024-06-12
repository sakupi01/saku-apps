import { type ContributionLevel, GraphSize } from "@/components/types/enums";

import type { Theme, Themes } from "@/components/types";

export const levels = {
  Null: -1,
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} satisfies Record<ContributionLevel, -1 | 0 | 1 | 2 | 3 | 4>;

export const SIZE = {
  [GraphSize.Small]: "small",
  [GraphSize.Medium]: "medium",
  [GraphSize.Large]: "large",
} as const satisfies Record<GraphSize, string>;

export const THEMES = [
  {
    name: "Default",
    radioButtonColor: "accent-green-500",
    themeClass: "default",
  },
  {
    name: "GitHub Dark",
    radioButtonColor: "accent-green-900",
    themeClass: "custom-github-dark",
  },
  {
    name: "Spring",
    radioButtonColor: "accent-pink-300",
    themeClass: "custom-spring",
  },
  {
    name: "Summer",
    radioButtonColor: "accent-yellow-400",
    themeClass: "custom-summer",
  },
  {
    name: "Autumn",
    radioButtonColor: "accent-orange-500",
    themeClass: "custom-autumn",
  },
  {
    name: "Winter",
    radioButtonColor: "accent-blue-500",
    themeClass: "custom-winter",
  },
] satisfies Theme[];
