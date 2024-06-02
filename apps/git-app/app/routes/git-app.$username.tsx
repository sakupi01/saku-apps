import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { error, success } from "~/types/results";
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

const queryContributedYears = `
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;

  try {
    const { data: contributionYears } = await fetcher(queryContributedYears, {
      username,
    });

    const promises =
      contributionYears?.user?.contributionsCollection.contributionYears.map(
        async (year: number) => {
          const { data: yearlyUserContributions } = await fetcher(
            queryYearlyUserContributions,
            {
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`,
            },
          );
          return yearlyUserContributions?.user?.contributionsCollection
            .contributionCalendar;
        },
      ) || [];

    const contributions = await Promise.all(promises);
    return success(contributions);
  } catch {
    return error("There was an error fetching the data");
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
          <pre>{JSON.stringify(data.data, null, 2)}</pre>
        ) : (
          <p>There was an error fetching the data</p>
        )}
      </div>
    </>
  );
}
