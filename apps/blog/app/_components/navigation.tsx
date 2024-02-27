import { Github, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import LocationIndicatorLink from "./location-indicator-link";
import Search from "./search";

export default function NavigationBar() {
  return (
    <nav className="w-full flex justify-between items-center lg:!flex-row flex-col md:px-10 px-5 py-5 md:gap-0 gap-6">
      <div className="flex flex-col md:!flex-row items-center justify-center md:gap-3 gap-5 ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/icon.png"}
            alt="sakuのアイコン"
            width="80"
            height="80"
          />
          <h1 className="text-4xl font-semibold text-left text-basic ">saku</h1>
        </Link>
        <div className="flex justify-start items-center">
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform md:-rotate-[60deg] hidden md:visible" />
          <LocationIndicatorLink href="/dev" linkName="Techblog" />
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform md:-rotate-[60deg] -rotate-90" />
          <LocationIndicatorLink href="/life" linkName="Lifeblog" />
          <div className="border-t-2 border-primary-500 w-[50px] mx-auto transform md:-rotate-[60deg] -rotate-90" />
          <LocationIndicatorLink href="/about" linkName="About" />
        </div>
      </div>
      <div className="flex justify-end items-center gap-5">
        <Suspense fallback={<Skeleton height="50px" />}>
          <Search placeholder="search..." />
        </Suspense>
        <Link
          href="https://www.skr-blog.com/feed.xml"
          className="p-2 md:p-3 rounded-full  transition-all duration-600 ease-in-out flex items-center justify-center hover:text-blossom "
          target="_blank"
        >
          <Rss className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
        </Link>
        <Link
          href="https://github.com/saku-1101/saku-apps"
          className="p-2 md:p-3 rounded-full  transition-all duration-600 ease-in-out flex items-center justify-center hover:text-blossom focus:text-blossom"
          target="_blank"
        >
          <Github className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
        </Link>
      </div>
    </nav>
  );
}
