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
import { redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Browse GitHub Contributions" },
    {
      name: "description",
      content: "Enter a GitHub username to see their contributions",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username") || "";
  console.log("username", username);

  return redirect(`/${username}`);
}

export default function GitApp() {
  return (
    <>
      <h1>Git Browse App</h1>
      <p>Enter a GitHub username to see their contributions</p>
      <form action="?index" method="post">
        <input name="username" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
