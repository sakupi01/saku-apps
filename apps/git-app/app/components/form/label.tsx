type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <label
      className="mb-2 text-sm font-medium text-primary-text sr-only "
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};
