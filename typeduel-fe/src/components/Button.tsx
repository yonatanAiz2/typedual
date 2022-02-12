interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
