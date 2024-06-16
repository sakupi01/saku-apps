import type { ContributionLevel } from "./enums";

export type Themes =
  | "Default"
  | "GitHub Dark"
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter";

export type ThemeClasses =
  | "default"
  | "custom-github-dark"
  | "custom-spring"
  | "custom-summer"
  | "custom-autumn"
  | "custom-winter";

export interface Theme {
  name: Themes;
  radioButtonColor: string;
  themeClass: ThemeClasses;
}

export interface ContributionDay {
  level: `${ContributionLevel}`;
  date: string;
  contributionCount: number;
  weekday?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContributionCalendar {
  total: number;
  year: number;
  weeks: {
    days: ContributionDay[];
  }[];
}
