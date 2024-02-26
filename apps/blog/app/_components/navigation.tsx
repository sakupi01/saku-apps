import { Github, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LocationIndicatorLink from "./location-indicator-link";
import Search from "./search";

export default function NavigationBar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/icon.png"}
            alt="sakuのアイコン"
            width="80"
            height="80"
          />
          <h1 className="text-4xl font-semibold text-left text-basic">saku</h1>
        </Link>
        <div className="flex justify-start items-center">
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform -rotate-[60deg]" />
          <LocationIndicatorLink href="/dev" linkName="Techblog" />
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform -rotate-[60deg]" />
          <LocationIndicatorLink href="/life" linkName="Lifeblog" />
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform -rotate-[60deg]" />
          <LocationIndicatorLink href="/about" linkName="About" />
        </div>
      </div>
      <div className="flex justify-end items-center gap-5">
        <Search placeholder="search..." />
        <Link
          href="https://github.com/saku-1101/saku-apps"
          className="p-3 rounded-full  transition-all duration-600 ease-in-out flex items-center justify-center hover:text-blossom"
          target="_blank"
        >
          <Rss className="w-10 h-10" strokeWidth={1} />
        </Link>
        <Link
          href="https://github.com/saku-1101/saku-apps"
          className="p-3 rounded-full  transition-all duration-600 ease-in-out flex items-center justify-center hover:text-blossom"
          target="_blank"
        >
          <Github className="w-10 h-10" strokeWidth={1} />
        </Link>
      </div>
    </nav>
  );
}
