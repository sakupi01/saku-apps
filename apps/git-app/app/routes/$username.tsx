import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { Heatmap } from "@/components/heatmap/heatmap";
import { ThemeSelector } from "@/components/theme-selector/theme-selector";
import type { ContributionCalendar } from "@/components/types";
import {
  QueryUserInfoAndContributionYearsDocument,
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
import domtoimage from "dom-to-image";
import { useRef } from "react";
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
    const { user } = await fetcher(
      githubApiUrl,
      QueryUserInfoAndContributionYearsDocument,
      {
        username,
      },
    );

    const { contributionsCollection, ...rest } = user ?? {};

    let totalInLifetime = 0;

    const promises =
      contributionsCollection?.contributionYears.map(
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

    return success({ ...rest, username, totalInLifetime, contributions });
  } catch {
    return error("There was an error fetching the data");
  }
};

export default function GitApp() {
  const data = useLoaderData<typeof loader>();
  const username = data.ok ? data.data?.username : "";
  const contributionImageAreaRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contributionImageAreaRef.current) {
      try {
        const dataURL = await domtoimage.toSvg(
          contributionImageAreaRef.current,
        );
        const trigger = document.createElement("a");
        trigger.href = dataURL;
        trigger.download = `${username}_contributions`;
        trigger.click();
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      } finally {
        setTimeout(() => {
          // setDownloading(false);
        }, 2000);
      }
    }
  };

  const handleCopyImage = async () => {
    if (contributionImageAreaRef.current) {
      try {
        const item = new ClipboardItem({
          "image/png": (async () => {
            if (!contributionImageAreaRef.current) {
              throw new Error();
            }

            const blobData = await domtoimage.toBlob(
              contributionImageAreaRef.current,
            );

            if (!blobData) {
              throw new Error();
            }

            return blobData;
          })(),
        });

        await navigator.clipboard.write([item]);

        // setCopySuccess(true);
        setTimeout(() => {
          // setCopySuccess(false);
        }, 2000);
      } catch (err) {
        if (err instanceof Error) {
          // trackEvent("Error: Copy Image", { msg: err.message });
          console.error(err.message);
        }
      } finally {
        // setDoingCopy(false);
      }
    }
  };

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
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-base-text ">
            {data.ok && data.data?.name ? data.data.name : username}'s
            Contributions 🪴
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              className="text-primary-text end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-active font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleDownload}
            >
              Get Image
            </button>

            <button
              type="button"
              className="text-primary-text end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-active font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleCopyImage}
            >
              Copy Image
            </button>
          </div>
        </div>

        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />

        <div ref={contributionImageAreaRef}>
          <div className="flex items-center gap-3 py-3">
            <img
              className="w-10 h-10 p-1 rounded-full ring-1 ring-gray-300 "
              src={data.ok ? data.data?.avatarUrl : "/avatar.png"}
              alt="Rounded avatar"
            />
            <h2 className="text-lg font-bold text-base-text">
              {data.ok && data.data?.name ? data.data.name : username} has made{" "}
              <span className="text-primary-active font-bold text-lg">
                {data.ok ? data.data?.totalInLifetime : "Nan"}
              </span>{" "}
              contributions in life!
            </h2>
          </div>
          {data.ok ? (
            <div className="text-base-text">
              {data.data?.bio ? <p className="pb-3">{data.data.bio} </p> : ""}
              {data.data?.username ? (
                <p className="text-sm pb-2">id: {data.data.username} </p>
              ) : (
                ""
              )}
              {data.data?.email ? (
                <span className="bg-primary-disabled text-primary-background-text text-[0.65rem] font-medium me-2 px-2.5 py-0.5 rounded-full">
                  📧 {data.data.email || "saku@mailcom"}
                </span>
              ) : (
                ""
              )}
              {data.data?.company ? (
                <span className="bg-primary-disabled text-primary-background-text text-[0.65rem] font-medium me-2 px-2.5 py-0.5 rounded-full">
                  💼 {data.data.company}
                </span>
              ) : (
                ""
              )}
              {data.data?.twitterUsername ? (
                <span className="bg-primary-disabled text-primary-background-text text-[0.65rem] font-medium me-2 px-2.5 py-0.5 rounded-full">
                  @{data.data.twitterUsername}
                </span>
              ) : (
                ""
              )}
              {data.data?.followers ? (
                <span className="bg-primary-disabled text-primary-background-text text-[0.65rem] font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {data.data.followers?.totalCount} Followers
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <p>There was an error fetching the data</p>
          )}
          <div className="flex flex-col gap-8 mt-7">
            {data.ok ? (
              data.data?.contributions.map((annualData) => (
                <Heatmap key={annualData.year} data={annualData} />
              ))
            ) : (
              <p>There was an error fetching the data</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
