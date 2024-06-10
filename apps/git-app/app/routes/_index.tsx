import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { Layout } from "./_layout";

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
    <Layout>
      <div className="w-full">
        <h1 className="my-5 text-3xl text-center font-bold text-base-text">
          Git Browse App
        </h1>
        <p className="text-md text-center text-base-text">
          Enter a GitHub username to see their contributions.
        </p>
        <Form action="?index" method="post" className="my-10">
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
      </div>
    </Layout>
  );
}
