/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import ExportContext from "../contexts/Context";
import Cardcarresult from "../components/Cardcarresult";

export default function MyFavorite() {
  const { infoUser } = useContext(ExportContext.Context);
  const [favoris, setFavoris] = useState([]);

  const getFavoris = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/favorisbyuser/${infoUser.id}`)
      .then((response) => {
        setFavoris(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteAnnounce = (announceId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/favoris/${
          infoUser.id
        }/${announceId}`
      )
      .then(() => {
        setFavoris((prevFavoris) =>
          prevFavoris.filter((car) => car.announce_id !== announceId)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    console.info(infoUser.id);
    getFavoris();
  }, [infoUser.id]);

  return (
    <div className="main">
      <h1>Mes Favoris</h1>
      <div className="card_section_favoris">
        {favoris.map((car, index) => (
          <div className="card" key={index}>
            <div className="coeur">
              <FaHeart
                className="heart-icon"
                onClick={() => deleteAnnounce(car.announce_id)}
              />
            </div>
            <Cardcarresult car={car} />
          </div>
        ))}
      </div>
    </div>
  );
}
