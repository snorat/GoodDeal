/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { PiRoadHorizonFill } from "react-icons/pi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbManualGearbox } from "react-icons/tb";

export default function CarDetailCard({ details }) {
  if (!details) {
    return <p>Erreur d'affichage des détails</p>;
  }

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const carImages = [
    details.image_1,
    details.image_2,
    details.image_3,
    details.image_4,
  ];

  return (
    <div className="card_details_car">
      <div className="car_detail_image">
        <div className="selected_image">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/uploads/${
              carImages[selectedImage]
            }`}
            alt="car"
          />
        </div>
        <div className="image_scroll">
          {carImages.map((carImage, index) => (
            <img
              key={carImage}
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/images/uploads/${carImage}`}
              alt={`${carImage}`}
              role="presentation"
              onClick={() => handleImageClick(index)}
              selectedImage={selectedImage}
            />
          ))}
        </div>
      </div>

      <div className="car_content">
        <h3>
          {details.car_brand_name} {details.car_model_name}
        </h3>
        <p>
          {details.city} - {details.postalcode}
        </p>
        <h5>{details.price} EUR</h5>
      </div>

      <div className="tag_card_car">
        <div className="tag_car_details">
          <span>
            {" "}
            <LiaBirthdayCakeSolid />{" "}
          </span>{" "}
          <h6>{details.year}</h6>
        </div>

        <div className="tag_car_details">
          <span>
            <PiRoadHorizonFill />
          </span>{" "}
          <h6>{details.kilometer}</h6>
        </div>
        <div className="tag_car_details">
          <span>
            <BsFillFuelPumpFill />
          </span>
          <h6>{details.motorisation}</h6>
        </div>
        <div className="tag_car_details">
          <span>
            <TbManualGearbox />
          </span>{" "}
          <h6>{details.transmission}</h6>
        </div>
      </div>
      <div className="description">
        <h5>Description</h5>
        <p>{details.description}</p>
      </div>
    </div>
  );
}

CarDetailCard.propTypes = {
  details: PropTypes.shape({
    price: PropTypes.number,
    year: PropTypes.number,
    car_brand_name: PropTypes.string,
    car_model_name: PropTypes.string,
    motorisation: PropTypes.string,
    kilometer: PropTypes.number,
    transmission: PropTypes.string,
    description: PropTypes.string,
    image_1: PropTypes.string,
    image_2: PropTypes.string,
    image_3: PropTypes.string,
    image_4: PropTypes.string,
    city: PropTypes.string,
    postalcode: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
