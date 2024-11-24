"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function LocationIndicatorLink({
  href,
  linkName,
}: {
  href: string;
  linkName: string;
}) {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return pathname.includes(href);
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={clsx(
        "md:text-2xl text-xl font-semibold text-left hover:text-blossom transition-all duration-600 ease-in-out",
        {
          "text-blossom": isActive,
          "text-basic": !isActive,
        },
      )}
    >
      {linkName}
    </Link>
  );
}
