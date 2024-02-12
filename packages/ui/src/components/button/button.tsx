"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "ui-px-4 ui-py-2 ui-text-white ui-bg-red-500 ui-rounded-md ui-shadow-md",
        className,
      )}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
