import React from "react";
import PropTypes from "prop-types";

export default function Specs({ details }) {
  return (
    <div className="part2">
      <div className="detail-pair">
        <p>Marque</p>
        <h5>{details.car_brand_name}</h5>
      </div>
      <div className="detail-pair">
        <p>Modèle</p>
        <h5>{details.car_model_name}</h5>
      </div>
      <div className="detail-pair">
        <p>Année</p>
        <h5>{details.year}</h5>
      </div>
      <div className="detail-pair">
        <p>Kilométrage</p>
        <h5>{details.kilometer}</h5>
      </div>
      <div className="detail-pair">
        <p>Carburant</p>
        <h5>{details.motorisation}</h5>
      </div>
      <div className="detail-pair">
        <p>Transmission</p>
        <h5>{details.transmission}</h5>
      </div>
      <div className="detail-pair">
        <p>Type</p>
        <h5>{details.car_type_name}</h5>
      </div>
      <div className="detail-pair">
        <p>Puissance</p>
        <h5>{details.power} Ch</h5>
      </div>
      <div className="detail-pair">
        <p>Première main</p>
        <h5>{details.condition}</h5>
      </div>
      <div className="detail-pair">
        <p>Permis</p>
        <h5>{details.license}</h5>
      </div>
    </div>
  );
}

Specs.propTypes = {
  details: PropTypes.shape({
    year: PropTypes.number,
    car_brand_name: PropTypes.string,
    car_model_name: PropTypes.string,
    motorisation: PropTypes.string,
    kilometer: PropTypes.number,
    transmission: PropTypes.string,
    car_type_name: PropTypes.string,
    power: PropTypes.number,
    condition: PropTypes.string,
    license: PropTypes.string,
  }).isRequired,
};
