import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/carbrandmenu.css";

export default function CarBrandMenu() {
  const [carbrands, setCarbrands] = useState([]);

  const getCarbrands = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/carmodelbybrand`)
      .then((response) => {
        setCarbrands(response.data);
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des marques : ", error);
      });
  };

  useEffect(() => {
    getCarbrands();
  }, []);

  const brandModels = {};

  carbrands.forEach((car) => {
    if (!brandModels[car.car_brand_name]) {
      brandModels[car.car_brand_name] = [];
    }
    brandModels[car.car_brand_name].push(car.car_model_name);
  });

  return (
    <div className="car_brand_menu">
      {Object.keys(brandModels).map((brand) => (
        <div className="car_model_by_brand" key={brand}>
          <Link to={`/result/${brand}`}>
            <h3>{brand}</h3>
          </Link>
          <div className="car_model_list">
            {brandModels[brand].map((model) => (
              <div key={`${brand}-${model}`}>
                <h4 className="model_list">
                  <Link to={`/result/${model}`}>{model}</Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
