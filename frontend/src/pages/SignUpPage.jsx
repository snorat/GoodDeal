import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineArrowRight } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePrenom = (event) => {
    setLastname(event.target.value);
  };
  const handleChangeNom = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeCheckedPassword = (event) => {
    setCheckedPassword(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const sendRegisterData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      console.info("email", email);
      console.info("password", password);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user`, {
          firstname,
          lastname,
          email,
          password,
        })
        .then((response) => {
          toast.success(response.data.message);
          setSuccess(true);
          setError(false);
        })
        .catch((err) => {
          if (err.response) {
            if (
              err.response.data.error ===
              `"firstname" is not allowed to be empty`
            ) {
              toast.error("Le Prenom ne peut pas être vide");
            } else if (
              err.response.data.error === `"firstname" must be a valid name`
            ) {
              toast.error("Mettre un prenom valide");
            } else if (
              err.response.data.error ===
              `"lastname" is not allowed to be empty`
            ) {
              toast.error("Le Prenom ne peut pas être vide");
            } else if (
              err.response.data.error === `"lastname" must be a valid name`
            ) {
              toast.error("Mettre un nom valide");
            } else if (
              err.response.data.error === `"email" is not allowed to be empty`
            ) {
              toast.error("L'email ne peut pas être vide");
            } else if (
              err.response.data.error === `"email" must be a valid email`
            ) {
              toast.error("Mettre un email valide");
            } else if (
              err.response.data.error ===
              `"password" is not allowed to be empty`
            ) {
              toast.error("Merci de donner un mot de passe");
            } else if (
              err.response.data.error ===
              `"password" length must be at least 8 characters long`
            ) {
              toast.error("Le mot de passe doit faire au moins 8 caractères");
            } else if (err.response.data.error === 1062) {
              toast.error("L'email est déjà enregistré");
            } else {
              console.error(err.response.data.error);
            }
          } else {
            console.error(err);
          }
          setSuccess(false);
          setError(true);
        });
    } else {
      toast.error("Les mots de passe ne correspondent pas");
      console.error("Les mots de passe ne correspondent pas");
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup_background">
        <div className="sign_up">
          <div className="signup_title">
            <h1>Ne ratez aucun deal!</h1>
            <p>
              Accédez à catalogue complet de véhicules de qualité et prenez la
              route en sécurité.
            </p>
            <Link className="btn_membre2" to="/login">
              <button type="submit">
                Je suis déjà membre
                <span className="iconWrapper_login">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </Link>
          </div>
          <div className="signup_header">
            <div className="signup_header_title">
              <h1>Créer un compte</h1>
              <p>
                Crée un compte gratuitement et rejoins notre communauté de
                membres pour accéder à de nombreux avantages :
              </p>
              <ul>
                <li>
                  <AiOutlineCheckCircle className="icon" />
                  Prise de contact simplifiée
                </li>

                <li>
                  <AiOutlineCheckCircle className="icon" />
                  Achetez sereinement
                </li>

                <li>
                  <AiOutlineCheckCircle className="icon" />
                  Déposer des annonces
                </li>
              </ul>
            </div>
            <div className="register_formulaire">
              <form onSubmit={sendRegisterData}>
                <input
                  className="my-input"
                  type="text"
                  placeholder="Prenom"
                  onChange={handleChangePrenom}
                />
                <br />
                <br />
                <input
                  className="my-input"
                  type="text"
                  placeholder="Nom"
                  onChange={handleChangeNom}
                />
                <br />
                <br />
                <input
                  className="email-input"
                  type="email"
                  placeholder="Adresse email"
                  onChange={handleChangeEmail}
                />
                <br />
                <br />
                <input
                  className="password-input"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handleChangePassword}
                />
                <br />
                <br />
                <input
                  className="password-input"
                  type="password"
                  placeholder="Confirmation du mot de passe"
                  onChange={handleChangeCheckedPassword}
                />
                <br />
                <br />
                <button className="btn-create" type="submit">
                  Créer un compte
                </button>

                <br />

                <button
                  className="btn-deja"
                  type="submit"
                  onClick={handleButtonClick}
                >
                  Déjà membre
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </>
  );
}
