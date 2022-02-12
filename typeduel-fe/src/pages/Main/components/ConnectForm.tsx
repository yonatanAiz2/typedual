import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useAuthContext } from "../../../context/AuthContext";

const ConnectForm = () => {
  const { login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());
    login(formData.username as string);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Input
          label={{ content: "username", htmlFor: "username" }}
          input={{
            placeholder: "enter username",
            id: "username",
            name: "username",
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ConnectForm;
