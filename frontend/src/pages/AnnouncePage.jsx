import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/announcepage.css";
import { Alert, AlertTitle } from "@mui/material";
import ExportContext from "../contexts/Context";

export default function AnnouncePage() {
  const { infoUser } = useContext(ExportContext.Context);
  const [brand, setBrand] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/checkauth`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((err) => {
        console.error(err);
        navigate("/"); // if unauthorised user then it goes to homepage
      });
  }, []);

  const [annonce, setAnnonce] = useState({
    user_id: infoUser.id,
    title: "",
    price: 0,
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    year: "",
    car_brand_id: null,
    car_model_id: null,
    motorisation: "essence",
    kilometer: "",
    transmission: "manuelle",
    car_type_id: 1,
    power: "",
    state: "yes",
    license: "yes",
    description: "",
    contact: "",
    city: "",
    postalcode: "",
  });

  const handleChangeValues = (event) => {
    if (
      event.target.name === "car_brand_id" ||
      event.target.name === "car_model_id" ||
      event.target.name === "price" ||
      event.target.name === "year" ||
      event.target.name === "kilometer" ||
      event.target.name === "car_type_id" ||
      event.target.name === "power"
    ) {
      setAnnonce({
        ...annonce,
        [event.target.name]: parseInt(event.target.value, 10),
      });
    } else {
      setAnnonce({
        ...annonce,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;

    setAnnonce((prevData) => {
      const updatedAnnonce = { ...prevData, [name]: file };

      if (updatedAnnonce.image_1) {
        // eslint-disable-next-line no-plusplus
        for (let i = 2; i <= 4; i++) {
          if (!updatedAnnonce[`image_${i}`]) {
            updatedAnnonce[`image_${i}`] = updatedAnnonce.image_1;
          }
        }
      }

      return updatedAnnonce;
    });
  };

  console.info("user_id,", infoUser.id);

  const sendFormData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user_id", infoUser.id);
    formData.append("title", annonce.title);
    formData.append("price", annonce.price);
    formData.append("image_1", annonce.image_1);
    formData.append("image_2", annonce.image_2);
    formData.append("image_3", annonce.image_3);
    formData.append("image_4", annonce.image_4);
    formData.append("year", annonce.year);
    formData.append("car_brand_id", annonce.car_brand_id);
    formData.append("car_model_id", annonce.car_model_id);
    formData.append("motorisation", annonce.motorisation);
    formData.append("kilometer", annonce.kilometer);
    formData.append("transmission", annonce.transmission);
    formData.append("car_type_id", annonce.car_type_id);
    formData.append("power", annonce.power);
    formData.append("state", annonce.state);
    formData.append("license", annonce.license);
    formData.append("description", annonce.description);
    formData.append("contact", annonce.contact);
    formData.append("city", annonce.city);
    formData.append("postalcode", annonce.postalcode);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/announce`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.info(response);
        setSuccess(response.data.message);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error);
      });
  };

  const getBrand = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/carbrand`)
      .then((response) => {
        setBrand(response.data);
      });
  };

  const getModel = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/carmodellistbybrand/${
          annonce.car_brand_id
        }`
      )
      .then((response) => {
        setModels(response.data);
      });
  };

  const getType = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cartype`)
      .then((response) => {
        setTypes(response.data);
        console.info(response.data);
      });
  };

  useEffect(() => {
    getBrand();
    getType();
  }, []);

  useEffect(() => {
    getModel();
  }, [annonce.car_brand_id]);

  console.info(annonce);

  return (
    <div className="annonce">
      <h2>Merci d’avoir choisi TheGoodeal afin de publier votre annonce !</h2>

      <div className="content">
        <form onSubmit={sendFormData}>
          <div className="contentpartform">
            <div className="firstpartform">
              <div className="title">
                <p>Titre</p>
                <input
                  name="title"
                  type="text"
                  placeholder="A vendre magnifique 207... Super occasion..."
                  onChange={handleChangeValues}
                />
              </div>
              <div className="price">
                <p>Prix</p>
                <input
                  type="number"
                  placeholder="20000... 5000...."
                  name="price"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="brand">
                <p> Sélectionner la marque de votre véhicule</p>
                <select name="car_brand_id" onChange={handleChangeValues}>
                  <option value="">Sélectionner une marque </option>
                  {brand.map((car) => (
                    <option key={car.car_brand_id} value={car.car_brand_id}>
                      {car.car_brand_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="model">
                <p> De quel modéle s'agit-il</p>
                <select name="car_model_id" onChange={handleChangeValues}>
                  <option value="">Sélectionner un modele </option>
                  {models.map((model) => (
                    <option key={model.car_model_id} value={model.car_model_id}>
                      {model.car_model_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="year">
                <p>Année</p>
                <input
                  type="number"
                  placeholder="1999... 2014..."
                  name="year"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="motorisations">
                <p> Type de motorisation</p>
                <select onChange={handleChangeValues} name="motorisation">
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrique">Electrique</option>
                </select>
              </div>
              <div className="kilometer">
                <p>Kilomètres</p>
                <input
                  type="number"
                  placeholder="20000... 100000..."
                  name="kilometer"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="transmission">
                <p> Transmission</p>
                <select onChange={handleChangeValues} name="transmission">
                  <option value="manuelle">Manuelle</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>
            </div>
            <div className="secoundpartform">
              <div className="type">
                <p> Type de véhicule</p>
                <select name="car_type_id" onChange={handleChangeValues}>
                  {types.map((type) => (
                    <option value={type.car_type_id}>
                      {type.car_type_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="power">
                <p>Puissance</p>
                <input
                  type="number"
                  placeholder="75..."
                  name="power"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="mains">
                <p>Première main</p>
                <select name="state" onChange={handleChangeValues}>
                  <option value="yes">Oui</option>
                  <option value="no">Non</option>
                </select>
              </div>
              <div className="permis">
                <p> Permis</p>
                <select name="licence" onChange={handleChangeValues}>
                  <option value="yes">Avec permis</option>
                  <option value="no">Sans permis</option>
                </select>
              </div>
              <div className="contact">
                <p>Téléphone</p>
                <input
                  type="text"
                  placeholder="0605040302..."
                  name="contact"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="city">
                <p>Ville</p>
                <input
                  type="text"
                  placeholder="Paris...Marseille..."
                  name="city"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="postalcode">
                <p>Code postal</p>
                <input
                  type="text"
                  placeholder="75020...13018..."
                  name="postalcode"
                  onChange={handleChangeValues}
                />
              </div>
            </div>
            <div className="part3form">
              <div className="descriptions">
                <p>Description</p>
                <textarea
                  type="text"
                  placeholder="Voiture en bon étât. Quelques rayures à l’avant et à l’arrière. Courroie de distribution à changer bientôt. Jamais accidentée. Non fumeur."
                  name="description"
                  onChange={handleChangeValues}
                />
              </div>
              <div className="pictures">
                <p>Les photos de votre véhicule</p>
                <input type="file" name="image_1" onChange={handleFileChange} />
                <input type="file" name="image_2" onChange={handleFileChange} />
                <input type="file" name="image_3" onChange={handleFileChange} />
                <input type="file" name="image_4" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          <div className="button">
            <input
              type="submit"
              value="Publier l'annonce"
              // ref={inputRef}
              onSubmit={sendFormData}
            />
          </div>
        </form>
        <div className="alerte">
          {success ?? (
            <Alert severity="success">
              <AlertTitle>Annonce créée avec succés</AlertTitle>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              <AlertTitle>
                Merci de remplir tous les champs obligatoires
              </AlertTitle>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
