import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Result } from "~/types/results";
import { fetcher } from "~/utils/fetcher";

export const meta: MetaFunction = () => {
  return [
    { title: "Git Browse App" },
    {
      name: "description",
      content: "Your can browse anyone's GitHub contributions!",
    },
  ];
};

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<Result<Array<any>>> => {
  const username = params.username;

  const queryUserContributionYears = `
  query QueryUserContributionYears ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionYears
      }
    }
  }`;

  const queryYearlyUserContributions = `
  query QueryYearlyUserContributions ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }`;

  try {
    const { data: contributionYears } = await fetcher(
      queryUserContributionYears,
      { username },
    );

    const promises =
      contributionYears.user.contributionsCollection.contributionYears.map(
        async (year: string) => {
          const { data: yearlyUserContributions } = await fetcher(
            queryYearlyUserContributions,
            {
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`,
            },
          );
          return yearlyUserContributions.user.contributionsCollection
            .contributionCalendar;
        },
      );

    const contributions = await Promise.all(promises);
    return { ok: true, message: null, data: contributions };
  } catch {
    return { ok: false, message: "Error fetching data", data: null };
  }
};

export default function GitApp() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Git Browse App</h1>
      <p>Enter a GitHub username to see their contributions</p>
      <form method="post">
        <input name="username" />
        <button type="submit">Search</button>
      </form>
      <br />
      <h2>Contributions</h2>
      <div>
        {data.ok ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>There was an error fetching the data</p>
        )}
      </div>
    </>
  );
}
