import type {
  ContributionLevel,
  DisplayName,
  ErrorType,
  GraphSize,
} from "./enums";

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

export type GitHubUsername = string;
export type ContributionYear = number;

export interface GitHubUser {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionsCollection: {
    years: ContributionYear[];
  };
}

export interface GitHubContributionCalendar {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}

export interface ContributionBasic {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionYears: ContributionYear[];
}

export interface ContributionDay {
  level: `${ContributionLevel}`;
  weekday?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContributionCalendar {
  total: number;
  year: number;
  weeks: {
    days: ContributionDay[];
  }[];
}

export interface GraphData extends ContributionBasic {
  contributionCalendars: ContributionCalendar[];
}

export interface ResponseData {
  errorType?: ErrorType;
  message?: string;
  data?: GraphData;
}

export interface GraphSettings {
  displayName?: DisplayName;
  yearRange?: [start_year: string | undefined, end_year: string | undefined];
  showAttribution?: boolean;
  size?: GraphSize;
  theme?: Themes;
}

export interface GitHubApiJson<Data> {
  data?: Data;
  message?: string;
  errors?: { type: string; message: string }[];
}
