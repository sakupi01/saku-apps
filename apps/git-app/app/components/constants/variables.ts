import {
  type ContributionLevel,
  DisplayName,
  GraphSize,
} from "@/components/types/enums";

import type { Theme, Themes } from "@/components/types";

export const levels = {
  Null: -1,
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} satisfies Record<ContributionLevel, -1 | 0 | 1 | 2 | 3 | 4>;

export const sizeProperties = {
  [GraphSize.Small]: {
    "--block-size": "10px",
    "--block-round": "2px",
    "--block-gap": "3px",
  },
  [GraphSize.Medium]: {
    "--block-size": "11px",
    "--block-round": "3px",
    "--block-gap": "3px",
  },
  [GraphSize.Large]: {
    "--block-size": "12px",
    "--block-round": "3px",
    "--block-gap": "4px",
  },
} as const satisfies Record<
  GraphSize,
  {
    "--block-size": string;
    "--block-round": string;
    "--block-gap": string;
  }
>;

export const DEFAULT_SIZE: GraphSize = GraphSize.Small;
export const DEFAULT_THEME: Themes = "Default";
export const DEFAULT_DISPLAY_NAME: DisplayName = DisplayName.Username;

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
