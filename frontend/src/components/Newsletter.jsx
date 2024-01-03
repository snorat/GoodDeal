import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const sendRegisterData = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/newsletter`, {
        email,
      })
      .then((response) => {
        const actualResponse = response.data;
        toast.success(actualResponse.message);
      })
      .catch((err) => {
        const actualError = err.response ? err.response.data : err;
        if (actualError.error === '"email" is not allowed to be empty') {
          toast.error("L'email ne peut pas être vide");
        } else if (actualError.error === 1062) {
          toast.error("L'email est déjà enregistré");
        } else {
          console.error(actualError.error);
        }
      });
  };

  return (
    <>
      <div className="newsletter">
        <div className="title">
          <h4>Newsletter</h4>
        </div>

        <div className="text">
          <p>
            Inscrivez-vous à la newsletter et recevez en exclusivité les offres
            les plus incroyables avant qu’elles soient publiées !
          </p>
        </div>

        <form className="subscribe" onSubmit={sendRegisterData}>
          <div className="inscription">
            <input
              type="email"
              placeholder="Saisissez une adresse mail ..."
              onChange={handleChangeEmail}
            />
            <input type="submit" value="Valider" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
