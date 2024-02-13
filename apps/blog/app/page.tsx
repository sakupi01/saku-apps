import { getAllArticles } from "@/libs/getApi";
import { Button } from "@repo/ui";

export default async function Page() {
  const content = getAllArticles();
  console.log(content);

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <Button appName="web">Click me!</Button>

      <p>blog listing goes here</p>
    </main>
  );
}
