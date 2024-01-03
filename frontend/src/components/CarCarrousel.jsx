import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/carcarrousel.css";

export default function CarCarousel() {
  const [cars, setCars] = useState([]);

  const randomCar = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/randomselection`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    randomCar();
  }, []);

  return (
    <div className="car-carousel-container1">
      <div className="car-carousel-container">
        <div className="test">
          <h2>Vous pourriez aimer ces voitures...</h2>
        </div>
        <div className="header_nouveautés">
          {cars.map((car) => (
            <div className="details">
              <Link
                to={`/cardetails/${car.announce_id}`}
                key={car.id}
                className="details"
              >
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/images/uploads/${car.image_1}`}
                  alt={car.image_1}
                />
                <h3>{car.price} EUR</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
