import { Heatmap } from "@/components/heatmap/heatmap";
import type { ContributionCalendar } from "@/components/types";
import {
  QueryUserContributionYearsDocument,
  QueryYearlyUserContributionsDocument,
} from "@/gql/generated/graphql";
import { error, success } from "@/types/results";
import { fetcher } from "@/utils/fetcher";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { Form } from "../components/form/form";
import { Input } from "../components/form/input";
import { Label } from "../components/form/label";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.data?.username}'s GitHub Contributions` },
    {
      name: "description",
      content: `View ${data?.data?.username}'s GitHub contributions`,
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username") || "";
  return redirect(`/${username}`);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username || "";
  const githubApiUrl = process.env.GITHUB_API_URL || "";

  try {
    const contributionYears = await fetcher(
      githubApiUrl,
      QueryUserContributionYearsDocument,
      {
        username,
      },
    );

    const promises =
      contributionYears?.user?.contributionsCollection.contributionYears.map(
        async (year: number): Promise<ContributionCalendar> => {
          const yearlyUserContributions = await fetcher(
            githubApiUrl,
            QueryYearlyUserContributionsDocument,
            {
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`,
            },
          );
          const weeks =
            (yearlyUserContributions?.user?.contributionsCollection.contributionCalendar?.weeks.map(
              (week) => {
                return {
                  days: week.contributionDays.map((day) => {
                    return {
                      level: day.contributionLevel,
                    };
                  }),
                };
              },
            ) ?? []) satisfies ContributionCalendar["weeks"];
          return {
            year,
            total:
              yearlyUserContributions?.user?.contributionsCollection
                .contributionCalendar.totalContributions || 0,
            weeks,
          };
        },
      ) || [];

    const contributions = await Promise.all(promises);

    return success({ username, contributions });
  } catch {
    return error("There was an error fetching the data");
  }
};

export default function GitApp() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="text-3xl font-bold text-base-text">Git Browse App</h1>
      <p className="text-md text-base-text">
        Enter a GitHub username to see their contributions
      </p>
      <Form method="post">
        <>
          <Label htmlFor="username" />
          <Input id="username" name="username" />
          <button
            type="submit"
            className="text-primary-text absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-active font-medium rounded-lg text-sm px-4 py-2 animate-bounce hover:animate-none"
          >
            Search
          </button>
        </>
      </Form>
      <br />
      <h2>{data.ok ? data.data?.username : "unknown"}'s Contributions</h2>
      <div>
        {data.ok ? (
          data.data?.contributions.map((annualData) => (
            <Heatmap key={annualData.year} data={annualData} />
          ))
        ) : (
          <p>There was an error fetching the data</p>
        )}
      </div>
    </>
  );
}
