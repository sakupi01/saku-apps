import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { Heatmap } from "@/components/heatmap/heatmap";
import { ThemeSelector } from "@/components/theme-selector/theme-selector";
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
import { Layout } from "./_layout";

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

    let totalInLifetime = 0;

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
          const total =
            yearlyUserContributions?.user?.contributionsCollection
              .contributionCalendar.totalContributions || 0;
          totalInLifetime += total;
          return {
            year,
            total,
            weeks,
          };
        },
      ) || [];

    const contributions = await Promise.all(promises);

    return success({ username, totalInLifetime, contributions });
  } catch {
    return error("There was an error fetching the data");
  }
};

export default function GitApp() {
  const data = useLoaderData<typeof loader>();
  return (
    <Layout>
      <div className="w-full">
        <ThemeSelector />
        <Form method="post">
          <>
            <Input
              id="username"
              name="username"
              placeholder="Search by username..."
            />
            <button
              type="submit"
              className="text-primary-text absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-active font-medium rounded-lg text-sm px-4 py-2 animate-bounce hover:animate-none"
            >
              Search
            </button>
          </>
        </Form>
      </div>
      <div className="w-full py-10">
        <h2 className="text-xl font-bold text-base-text ">
          {data.ok ? data.data?.username : "unknown"}'s Contributions 🪴
        </h2>
        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full"
            src="/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />
          <h2 className="text-lg font-bold text-base-text">
            {data.ok ? data.data?.username : "unknown"} has made{" "}
            <span className="text-primary-active font-bold text-lg">
              {data.ok ? data.data?.totalInLifetime : "Nan"}
            </span>{" "}
            contributions in life!
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {data.ok ? (
          data.data?.contributions.map((annualData) => (
            <Heatmap key={annualData.year} data={annualData} />
          ))
        ) : (
          <p>There was an error fetching the data</p>
        )}
      </div>
    </Layout>
  );
}
