import { Button, Test } from "@repo/ui";

export default async function Page() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <Button appName="web">Click me!</Button>

      <Test />

      <p>blog listing goes here</p>
    </main>
  );
}
