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
        "px-4 py-2 text-base bg-button-primary rounded-md shadow-md hover:bg-button-primary-hover hover:text-white",
        className,
      )}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
