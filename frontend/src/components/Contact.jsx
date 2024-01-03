import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import ExportContext from "../contexts/Context";

export default function Contact({ details }) {
  if (!details) {
    return <p>Erreur d'affichage des détails</p>;
  }
  const { infoUser } = useContext(ExportContext.Context);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState();
  const { id } = useParams();
  const [isMsgSent, setIsMsgSent] = useState(false);

  // console.info("KevinNNN CG:", typeof(infoUser.id));

  console.info("isfavorite:", isFavorite);
  const getInitialFavoriteStatus = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/favorischeck/${infoUser.id}/${id}`
      )
      .then((response) => {
        console.info(response);
        setIsFavorite(true);
      })
      .catch((error) => {
        setIsFavorite(false);
        console.error("Erreur lors de la récupération des favoris :", error);
      });
  };

  const getMessageStatus = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/messagecheck/${infoUser.id}/${id}`
      )
      .then((response) => {
        console.info(response);
        setIsMsgSent(true);
      })
      .catch((error) => {
        setIsMsgSent(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getInitialFavoriteStatus();
    getMessageStatus();
  }, []);

  useEffect(() => {
    getMessageStatus();
  }, [isMsgSent]);

  console.info(isFavorite);

  const addToFavorites = () => {
    if (isFavorite) {
      console.info("L'annonce est déjà dans les favoris!");
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/favoris`,
        {
          announce_id: id,
          user_id: infoUser.id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response.data);
        setIsFavorite(true);
        setMessage("Voiture ajoutée aux favoris avec succès!");
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Erreur lors de l'ajout aux favoris :",
            error.response.data
          );
        } else {
          console.error(
            "Erreur lors de la requête d'ajout aux favoris :",
            error.message
          );
        }
      });
  };

  const sendMessage = () => {
    if (isMsgSent) {
      console.info("Message deja envoyé!");
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/sendautomaticmessage`,
        {
          announce_id: id,
          sender_user_id: infoUser.id,
          receiver_user_id: details.user_id,
          content:
            "Bonjour, Je suis intéressé par votre vehicle. Est-il toujours disponible?",
        },
        {
          withCredentials: true,
        }
      )

      .then((response) => {
        setIsMsgSent(true);
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="part3">
      <h3>
        <span className="circle">
          <span className="circle-text">
            {details.first_letter_of_firstname}
          </span>
        </span>
        {details.firstname}
      </h3>
      {console.info("parseint", parseInt(details.user_id, 10))}

      {parseInt(infoUser.id, 10) !== details.user_id ? (
        <div className="part3">
          {isFavorite === true ? (
            ""
          ) : (
            <button type="button" className="btn_1" onClick={addToFavorites}>
              Ajouter aux favoris
            </button>
          )}

          <h4>{message}</h4>

          {isMsgSent === true ? (
            <Link
              to={`/messages/${infoUser.id}/${details.user_id}/${details.announce_id}`}
            >
              <button type="button" className="btn_2">
                Voir la conversation
              </button>
            </Link>
          ) : (
            <button type="button" className="btn_2" onClick={sendMessage}>
              Envoyer un message
            </button>
          )}
          <p>Signaler une annonce</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
Contact.propTypes = {
  details: PropTypes.shape({
    user_id: PropTypes.number,
    announce_id: PropTypes.number,
    first_letter_of_firstname: PropTypes.string,
    firstname: PropTypes.string,
  }).isRequired,
};
