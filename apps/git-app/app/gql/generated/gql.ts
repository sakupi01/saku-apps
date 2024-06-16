import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "query QueryUserInfoAndContributionYears($username: String!) {\n  user(login: $username) {\n    id\n    name\n    avatarUrl\n    bio\n    company\n    email\n    url\n    twitterUsername\n    followers {\n      totalCount\n    }\n    contributionsCollection {\n      contributionYears\n    }\n  }\n}\n\nquery QueryYearlyUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $username) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            color\n            contributionCount\n            contributionLevel\n            date\n          }\n        }\n      }\n    }\n  }\n}":
    types.QueryUserInfoAndContributionYearsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query QueryUserInfoAndContributionYears($username: String!) {\n  user(login: $username) {\n    id\n    name\n    avatarUrl\n    bio\n    company\n    email\n    url\n    twitterUsername\n    followers {\n      totalCount\n    }\n    contributionsCollection {\n      contributionYears\n    }\n  }\n}\n\nquery QueryYearlyUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $username) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            color\n            contributionCount\n            contributionLevel\n            date\n          }\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["query QueryUserInfoAndContributionYears($username: String!) {\n  user(login: $username) {\n    id\n    name\n    avatarUrl\n    bio\n    company\n    email\n    url\n    twitterUsername\n    followers {\n      totalCount\n    }\n    contributionsCollection {\n      contributionYears\n    }\n  }\n}\n\nquery QueryYearlyUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $username) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            color\n            contributionCount\n            contributionLevel\n            date\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
