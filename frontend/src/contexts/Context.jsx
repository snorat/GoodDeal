/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    id: localStorage.getItem("id"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });

  const resetInfoUser = () => {
    setInfoUser({});
    localStorage.setItem("id", null);
    localStorage.setItem("firstname", null);
    localStorage.setItem("lastname", null);
    localStorage.setItem("email", null);
    localStorage.setItem("role", null);
  };

  useEffect(() => {
    // setInfoUser({});
    localStorage.setItem("id", infoUser.id);
    localStorage.setItem("firstname", infoUser.firstname);
    localStorage.setItem("lastname", infoUser.lastname);
    localStorage.setItem("email", infoUser.email);
    localStorage.setItem("role", infoUser.role);
  }, [infoUser]);

  return (
    <Context.Provider value={{ infoUser, setInfoUser, resetInfoUser }}>
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
