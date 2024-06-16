type InputProps = {
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ id, placeholder, name, ...props }: InputProps) => {
  return (
    <input
      type="search"
      className="block w-full p-4 ps-10 text-sm text-primary-background-text border border-gray-300 rounded-lg bg-primary-background focus:ring-primary focus:border-primary "
      placeholder={placeholder}
      name={name}
      required
      {...props}
    />
  );
};
