import clsx from "clsx";

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form = ({ className, children, ...props }: FormProps) => {
  return (
    <form className={clsx("max-w-md mx-auto p-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          🔍
        </div>
        {children}
      </div>
    </form>
  );
};
