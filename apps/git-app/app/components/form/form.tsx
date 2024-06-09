type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form = ({ className, children, ...props }: FormProps) => {
  return (
    <form className="max-w-md mx-auto" {...props}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          🔍
        </div>
        {children}
      </div>
    </form>
  );
};
