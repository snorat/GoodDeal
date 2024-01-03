import PropTypes from "prop-types";
import React from "react";
import { PiRoadHorizonFill } from "react-icons/pi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbManualGearbox } from "react-icons/tb";

export default function Cardcarresult({ car }) {
  return (
    car && (
      <div className="carannounce">
        <div className="carimage-result">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/uploads/${
              car.image_1
            }`}
            alt=""
          />
        </div>
        <div className="cardetails1">
          <h5>
            {car.car_brand_name}
            <span> {car.car_model_name}</span>
          </h5>
          <h5>€ {car.price}</h5>
          <div className="tag_card_car1">
            <div className="tag_car_details1">
              <span>
                {" "}
                <LiaBirthdayCakeSolid />{" "}
              </span>{" "}
              <h6>{car.year}</h6>
            </div>

            <div className="tag_car_details1">
              <span>
                <PiRoadHorizonFill />
              </span>{" "}
              <h6>{car.kilometer}</h6>
            </div>
            <div className="tag_car_details1">
              <span>
                <BsFillFuelPumpFill />
              </span>
              <h6>{car.motorisation}</h6>
            </div>
            <div className="tag_car_details1">
              <span>
                <TbManualGearbox />
              </span>{" "}
              <h6>{car.transmission}</h6>
            </div>
          </div>
          <h5>
            {car.city} {car.postalcode}
          </h5>
        </div>
      </div>
    )
  );
}
Cardcarresult.propTypes = {
  car: PropTypes.shape({
    image_1: PropTypes.string,
    car_brand_name: PropTypes.string,
    car_model_name: PropTypes.string,
    price: PropTypes.number,
    year: PropTypes.number,
    kilometer: PropTypes.number,
    motorisation: PropTypes.string,
    transmission: PropTypes.string,
    city: PropTypes.string,
    postalcode: PropTypes.string,
  }).isRequired,
};
