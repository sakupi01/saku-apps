import clsx from "clsx";

export const Divider = ({ className }: { className?: string }) => {
  return (
    <hr
      className={clsx(
        "border-spacing-x-0.5 border-neutral-200 my-2 w-full",
        className,
      )}
    />
  );
};
