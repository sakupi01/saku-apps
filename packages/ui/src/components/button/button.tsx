"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "px-4 py-2 text-base bg-button-primary rounded-md shadow-md hover:bg-button-primary-hover hover:text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
