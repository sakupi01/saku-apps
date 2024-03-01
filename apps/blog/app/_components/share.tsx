import { Button } from "@repo/ui";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
export default function ShareLinks({
  title,
  category,
  slug,
}: { title: string; category: "dev" | "life"; slug: string }) {
  return (
    <div className="flex justify-center gap-3">
      <Button intent={"round-icon"} size={"round"}>
        <Link
          href={`https://twitter.com/intent/tweet?text=${title}%20-%20saku's%20blog&url=https://www.skr-blog.com/${category}/articles/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter size="30" className="p-1" />
        </Link>
      </Button>
    </div>
  );
}
