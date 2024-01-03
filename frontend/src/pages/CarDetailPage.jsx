import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CarDetailCard from "../components/CarDetailCard";
import Contact from "../components/Contact";
import Specs from "../components/Specs";

export default function CarDetailPage() {
  const [cars, setCars] = useState([]);
  const { id } = useParams();

  const getCars = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/${id}`)
      .then((response) => {
        setCars(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getCars();
  }, [id]);

  return (
    <div className="card_section">
      <div key={cars.id} className="first_element">
        <CarDetailCard key={cars.id} details={cars} />
      </div>
      <div key={cars.id} className="second_element">
        <Contact key={cars.id} details={cars} />
        <Specs details={cars} />
      </div>
    </div>
  );
}
