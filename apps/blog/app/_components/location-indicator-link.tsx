"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
      className={clsx(`text-2xl font-semibold text-left hover:text-blossom`, {
        "text-blossom": isActive,
        "text-basic": !isActive,
      })}
    >
      {linkName}
    </Link>
  );
}
