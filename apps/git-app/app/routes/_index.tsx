import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { Layout } from "./_layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Git Kusa Graph" },
    {
      name: "description",
      content:
        "Visualize Your Coding Trail - Commit Heatmaps to Witness Your Growth.",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username") || "";

  return redirect(`/${username}`);
}

export default function GitApp() {
  return (
    <Layout>
      <div className="flex items-center">
        <img
          className="w-10 h-10"
          src={"/public/favicon.ico"}
          alt="Kusabocado"
        />
        <h1 className="my-16 text-3xl text-center font-bold text-base-text">
          Git Kusa Graph
        </h1>
        <img
          className="w-10 h-10"
          src={"/public/favicon.ico"}
          alt="Kusabocado"
        />
      </div>
      <h2 className="my-16 text-xl text-center text-base-text">
        Visualize Your Coding Trail - Commit Heatmaps to Witness Your Growth.
      </h2>
      <hr className="w-full my-6 border-gray-300 sm:mx-auto lg:my-8" />
      <p className="text-md text-center text-base-text">
        Enter a GitHub username to see their contributions.
      </p>
      <Form
        action="?index"
        method="post"
        className="w-full my-10"
        id="search-form-home"
      >
        <>
          <Input
            id="username"
            name="username"
            placeholder="Search by username..."
          />
          <button
            type="submit"
            className="text-primary-text absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover focus:ring-2 focus:outline-none focus:ring-primary-active font-medium rounded-lg text-sm px-4 py-2 animate-bounce hover:animate-none transition-colors"
          >
            Search
          </button>
        </>
      </Form>
    </Layout>
  );
}
