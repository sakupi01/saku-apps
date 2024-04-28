import { PropsWithChildren } from "react";

export default function Badge({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div>
      Hey {name}
      <hr />
      {children}
    </div>
  );
}
