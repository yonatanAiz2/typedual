interface InputProps {
  label: React.LabelHTMLAttributes<HTMLLabelElement> & { content: string };
  input: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ input, label }: InputProps) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label.htmlFor}
      >
        {label.content}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...input}
      />
    </>
  );
};

export default Input;
