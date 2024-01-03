import React, { useState } from "react";
import "../styles/loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Alert, AlertTitle } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const navigateToHomepage = () => {
    navigate("/");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const sendCredentials = (event) => {
    event.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("lastname", response.data.lastname);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        setSuccess(response.data.message);
        setError(false);
        navigateToHomepage();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="login_background">
      <div className="login_up">
        <div className="login_title">
          <h1>
            Ne ratez <br />
            aucun deal!
          </h1>
          <p>
            Accedez à un catalaogue complet de <br />
            véhicule de qualité et prenez la route en sécurité.
          </p>
          <Link className="btn_membre2" to="/signup">
            <button type="submit">
              Je veux être membre
              <span className="iconWrapper_login">
                <AiOutlineArrowRight />
              </span>
            </button>
          </Link>
        </div>
        <div className="login_header">
          <div className="login_header_title">
            <h1>Se connecter</h1>
            <p>
              Bienvenue dans votre espace connexion. Veuillez saisir votre email
              ainsi que votre mot de passe.
            </p>
          </div>
          <div className="login_formulaire">
            <form onSubmit={sendCredentials}>
              <input
                type="email"
                placeholder="Adresse email"
                onChange={handleChangeEmail}
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={handleChangePassword}
              />
              <button className="btn-connecter" type="submit">
                Se connecter
              </button>

              <br />
              <br />
            </form>

            <Link to="/signup" className="btn-signup">
              Pas encore membre ?
            </Link>
            <br />
            {success && (
              <Alert severity="success">
                <AlertTitle>Congratulations</AlertTitle>
                User logged in — <strong>successfully!</strong>
              </Alert>
            )}

            {/* {error ? "Email ou password incorrects" : ""} */}
            {error && (
              <Alert severity="error">
                <AlertTitle>Email ou password incorrects</AlertTitle>
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
