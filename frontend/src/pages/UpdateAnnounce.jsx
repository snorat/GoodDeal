import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/updateannounce.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportContext from "../contexts/Context";
import Cardcarresult from "../components/Cardcarresult";

export default function updateAnnounce() {
  const { infoUser } = useContext(ExportContext.Context);
  // console.info("infouser", infoUser.id);

  const [selectedAnnounce, setSelectedAnnounce] = useState({
    user_id: "",
    kilometer: "",
    price: "",
    description: "",
  });

  const [data, setData] = useState([]);

  const { announceId } = useParams();

  const getMyCar = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/myAnnouncebyuser/${infoUser.id}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getMyannounce = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/myAnnounceidbyuserid/${
          infoUser.id
        }/${announceId}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        setSelectedAnnounce({
          user_id: response.data[0].user_id,
          kilometer: response.data[0].kilometer || "",
          price: response.data[0].price || "",
          description: response.data[0].description || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const sendFormData = async (event) => {
    event.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/myAnnouncebyuser/${
          infoUser.id
        }/${announceId}`,
        selectedAnnounce,
        {
          user_id: selectedAnnounce.id,
          kilometer: selectedAnnounce.kilometer,
          price: selectedAnnounce.price,
          description: selectedAnnounce.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success("Annonce mise à jour avec succès!");
        console.info("Réponse de la mise à jour de l'annonce:", response.data);
      })
      .catch((error) => {
        toast.error("Erreur lors de la mise à jour de l'annonce!");
        console.error("Erreur lors de la mise à jour de l'annonce:", error);
      });
  };
  console.info(data[0]);

  useEffect(() => {
    getMyannounce();
  }, [infoUser.id, announceId]);

  useEffect(() => {
    getMyCar();
  }, []);

  return (
    <div className="update_announce">
      <h1>Modifier mon annonce</h1>
      {data.map((car) => (
        <Cardcarresult car={car} />
      ))}
      <ToastContainer />
      {selectedAnnounce && (
        <form className="announce-form" onSubmit={sendFormData}>
          <div className="inputs">
            <div className="kilometer">
              <label htmlFor="kilometer">Nombre de kilomètres</label>
              <input
                type="number"
                placeholder={selectedAnnounce.kilometer}
                value={selectedAnnounce.kilometer}
                name="kilometer"
                onChange={(event) =>
                  setSelectedAnnounce({
                    ...selectedAnnounce,
                    kilometer: event.target.value,
                  })
                }
              />
            </div>
            <div className="price">
              <p>Prix</p>
              <input
                type="number"
                placeholder={selectedAnnounce.price}
                value={selectedAnnounce.price}
                name="price"
                onChange={(event) =>
                  setSelectedAnnounce({
                    ...selectedAnnounce,
                    price: event.target.value,
                  })
                }
              />
            </div>
            <div className="mydescription">
              <p>Description</p>
              <textarea
                type="text"
                placeholder={selectedAnnounce.description}
                value={selectedAnnounce.description}
                name="description"
                onChange={(event) =>
                  setSelectedAnnounce({
                    ...selectedAnnounce,
                    description: event.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* <button type="submit"> Enregistrer les modifications </button> */}
          <div className="button">
            <input
              type="submit"
              value="Enregistrer les modifications"
              // ref={inputRef}
              onSubmit={sendFormData}
            />
          </div>
        </form>
      )}
    </div>
  );
}
