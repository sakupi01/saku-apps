import { Button, Gradient, Test } from "@repo/ui";

export default async function Page() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <Gradient className="opacity-5 w-[120px] h-[120px]" conic small />
      <Button
        appName="web"
        className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md"
      >
        Click me!
      </Button>

      <Test />

      <p>blog listing goes here</p>
    </main>
  );
}
