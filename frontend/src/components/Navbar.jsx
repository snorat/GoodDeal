import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";
import { CgProfile } from "react-icons/cg";
import { TbMessage } from "react-icons/tb";
import { FiPlusSquare } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import SearchBar from "./SearchBar";
import ExportContext from "../contexts/Context";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [carType, setCarType] = useState([]);
  const navigate = useNavigate();
  const { infoUser, setIsLoggedIn, resetInfoUser } = useContext(
    ExportContext.Context
  );

  console.info("infouserrole:", infoUser.role);

  const deconnecter = () => {
    console.info("Before logout:", infoUser);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        resetInfoUser();
        console.info("After logout:", infoUser);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cartypes`)
      .then((response) => {
        setCarType(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types de voiture :",
          error
        );
      });
  }, []);

  return (
    <div className="navbar">
      <nav className="nav">
        <button
          type="button"
          className={`hamburger ${isActive ? "active" : ""}`}
          onClick={toggleActiveClass}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <Link to="/" className="logo" onClick={removeActive}>
          <img
            src="/src/assets/images/logo_the_good_deal.png"
            alt="TheGoodDeal"
          />
        </Link>

        <ul className={`navMenu ${isActive ? "active" : ""}`}>
          <li key="messages">
            {infoUser.role === "user" ? (
              <NavLink to="/messages" className="login-icon">
                <div className="icon-text">
                  <TbMessage />
                  <span>Messages</span>
                </div>
              </NavLink>
            ) : (
              // unauthorised user have to be logged in when they click messages
              <NavLink to="/login" className="login-icon">
                <div className="icon-text">
                  <TbMessage />
                  <span>Messages</span>
                </div>
              </NavLink>
            )}
          </li>
          <li className="hide-on-mobile" key="profile">
            {infoUser.role === "user" ? (
              <div>
                <Link to="/backoffice" className="login-icon">
                  <CgProfile />
                  <span>Mon profil</span>
                  <div className="icon-text" />
                </Link>
              </div>
            ) : (
              <Link to="/login" className="login-icon" onClick={handleLogin}>
                <CgProfile />
                <span>Se connecter</span>
                <div className="icon-text" />
              </Link>
            )}
          </li>
          <li>
            {infoUser.role === "user" ? (
              <NavLink to="/announce" className="login-icon deposer-annonce">
                <div className="icon-text">
                  <FiPlusSquare />
                  <span> Déposer une annonce </span>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login" className="login-icon deposer-annonce">
                <div className="icon-text">
                  <FiPlusSquare />
                  <span> Déposer une annonce </span>
                </div>
              </NavLink>
            )}
          </li>
          {infoUser.role === "user" && (
            <div>
              <Link to="/" className="logout-icon" onClick={deconnecter}>
                <AiOutlineLogout />
                {/* <span>Déconnecter</span> */}
                <div className="icon-text" />
              </Link>
            </div>
          )}
        </ul>
      </nav>

      <SearchBar />
      <div className="category-section">
        <ul className={`navMenu ${isActive ? "active" : ""}`}>
          <li className="hide-on-desktop">
            {infoUser.role === "user" ? (
              <NavLink
                to="/announce"
                className="login-icon"
                onClick={removeActive}
              >
                <div className="icon-text">
                  <FiPlusSquare />
                  <span> Déposer une annonce </span>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={removeActive}>
                Déposer une annonce
              </NavLink>
            )}
          </li>
          <li className="hide-on-desktop">
            {infoUser.role === "user" ? (
              <NavLink
                to="/messages"
                className="login-icon"
                onClick={removeActive}
              >
                <div className="icon-text">
                  <TbMessage />
                  <span>Messages</span>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={removeActive}>
                Mes messages
              </NavLink> // unauthorised user have to be logged in when they click messages
            )}
          </li>
          <li>
            <NavLink to="/" onClick={removeActive}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/result/type/all" onClick={removeActive}>
              Toutes les catégories
            </NavLink>
          </li>
          <li>
            {carType.map((types) => (
              <NavLink
                key={types.id}
                className="car-type"
                to={`/result/type/${types.car_type_name}`}
                onClick={removeActive}
              >
                {types.car_type_name}
              </NavLink>
            ))}
            <div className="separator" />
          </li>
          <li className="hide-on-desktop">
            <NavLink
              to="/page404"
              className="navLink"
              activeclassname="active"
              onClick={removeActive}
            >
              A PROPOS DE THEGOODDEAL
            </NavLink>
          </li>
          <li className="hide-on-desktop">
            <NavLink
              to="/page404"
              className="navLink"
              activeclassname="active"
              onClick={removeActive}
            >
              INFORMATIONS LEGALES
            </NavLink>
          </li>
          <li className="hide-on-desktop">
            <div className="hide-on-desktop">
              {infoUser.role === "user" ? (
                <Link
                  to="/backoffice"
                  className="login-icon"
                  onClick={removeActive}
                >
                  <CgProfile />
                  <span>Mon profil</span>
                  <div className="icon-text" />
                </Link>
              ) : (
                <Link to="/login" className="login-icon" onClick={handleLogin}>
                  <CgProfile />
                  <span>Se connecter</span>
                  <div className="icon-text" />
                </Link>
              )}
              {infoUser.role === "user" && (
                <li>
                  <Link to="/" className="logout-icon" onClick={deconnecter}>
                    <AiOutlineLogout />
                    <div className="icon-text" />
                  </Link>
                </li>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
