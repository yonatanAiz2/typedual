import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-location";
import Button from "../../../../../../components/Button";
import Input from "../../../../../../components/Input";
import { useAuthContext } from "../../../../../../context/AuthContext";
import { useSocket } from "../../../../../../hooks/useSocket";
import useCreateGameForm from "./hooks/useCreateGameForm";

const CreateGameForm = () => {
  const { createGame, isWaitingForJoinGame } = useCreateGameForm();

  return (
    <>
      <form
        onSubmit={createGame}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Input
          label={{ content: "Letters", htmlFor: "letters" }}
          input={{
            id: "letters",
            name: "letters",
            type: "number",
            placeholder: "how many letters?",
          }}
        />
        <Button variant="secondary" type="submit">
          Create game
        </Button>
      </form>
      {isWaitingForJoinGame && (
        <h2 className="text font-bold text-gray-900 text-3xl">
          Waiting for someone to accept your challenge
        </h2>
      )}
    </>
  );
};

export default CreateGameForm;
