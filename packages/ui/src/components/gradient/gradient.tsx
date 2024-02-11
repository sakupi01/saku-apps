import clsx from "clsx";

export const Gradient = ({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <span
      className={clsx(
        "absolute inset-0 z-0 w-full h-full bg-slate-500",
        className,
        small
          ? "bg-gradient-to-r from-blue-400 to-purple-500"
          : "bg-gradient-to-r from-blue-500 to-purple-500",
        conic && "bg-gradient-conic",
      )}
    />
  );
};
