import React, { useState } from "react";
import { useNavigate } from "react-location";
import { useQuery } from "react-query";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";
import ConnectForm from "./components/ConnectForm";
import Games from "./components/Games";

const Main = () => {
  const { user } = useAuthContext();
  if (user) {
    return <Games />;
  }

  return <ConnectForm />;
};

export default Main;
