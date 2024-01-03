/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { CiEdit } from "react-icons/ci";
import ExportContext from "../contexts/Context";
import Cardcarresult from "../components/Cardcarresult";

export default function MyAnnounce() {
  const { infoUser } = useContext(ExportContext.Context);
  const [myannounce, setMyannounce] = useState([]);

  console.info(infoUser);

  const getMyannounce = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/myAnnouncebyuser/${infoUser.id}`
      )
      .then((response) => {
        setMyannounce(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteMyannounce = (announceId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/myAnnounce/${
          infoUser.id
        }/${announceId}`
      )
      .then(() => {
        setMyannounce((prevMyannounce) =>
          prevMyannounce.filter((car) => car.announce_id !== announceId)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    console.info(infoUser.id);
    getMyannounce();
  }, [infoUser.id]);

  return (
    <div className="myannouncecard">
      <h1>Mes Annonces</h1>
      <div className="carcards-mes-annonces">
        {myannounce.map((car, index) => (
          <div className="card-annonces" key={index}>
            <Cardcarresult car={car} />
            <div className="buttons-annonce">
              <div className="modifier-annonce">
                <Link to={`/updateAnnounce/${infoUser.id}/${car.announce_id}`}>
                  <button
                    type="button"
                    onClick={() => getMyannounce(car.announce_id)}
                  >
                    Modifier
                    <CiEdit />
                  </button>
                </Link>
              </div>
              <div className="supprimer-annonce">
                <button
                  type="button"
                  onClick={() => deleteMyannounce(car.announce_id)}
                >
                  Supprimer
                  <ImBin />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
