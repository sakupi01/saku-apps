"use client";

import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-button-primary",
        "text-base",
        "border-none",
        "rounded-md",
        "hover:bg-button-primary-hover",
        "hover:text-white",
      ],
      secondary: [
        "bg-button-secondary",
        "text-base",
        "border-basic",
        "rounded-md",
        "hover:bg-button-secondary-hover",
        "hover:text-white",
      ],
      subtle: [
        "bg-button-subtle",
        "text-base",
        "border-basic",
        "rounded-md",
        "hover:bg-button-subtle-hover",
        "hover:text-white",
      ],
      ghost: [
        "bg-button-ghost",
        "text-base",
        "border-basic",
        "rounded-md",
        "hover:bg-button-ghost-hover",
        "hover:text-white",
      ],
      "square-icon": [
        "bg-primary-subtle",
        "text-tag",
        "border-none",
        "rounded-md",
        "hover:bg-primary",
      ],
      "round-icon": [
        "bg-primary-subtle",
        "text-tag",
        "border-none",
        "rounded-full",
        "hover:bg-primary",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      square: ["text-base", "py-2", "px-2"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});
export const Button = ({
  children,
  intent,
  size,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        button({ intent, size }),
        className,
        "transition-all duration-400 ease-in-out",
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
