/** Check out: {@link https://docs.github.com/en/graphql/reference/enums#contributionlevel} */
export enum ContributionLevel {
  Null = "Null",
  NONE = "NONE",
  FIRST_QUARTILE = "FIRST_QUARTILE",
  SECOND_QUARTILE = "SECOND_QUARTILE",
  THIRD_QUARTILE = "THIRD_QUARTILE",
  FOURTH_QUARTILE = "FOURTH_QUARTILE",
}

export enum ErrorType {
  BadCredentials = 0,
  BadRequest = 1,
}

export enum GraphSize {
  Small = "s",
  Medium = "m",
  Large = "l",
}

export enum DisplayName {
  Username = "0",
  ProfileName = "1",
}
