import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cardcarresult from "../components/Cardcarresult";
import filterCars from "../services/carFilterServices";

export default function ResultPage() {
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState([]);
  const [motorisation, setMotorisation] = useState("");
  const [price, setPrice] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [error, setError] = useState(false);
  const { type } = useParams();

  const getCars = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce`)
      .then((response) => {
        setCars(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  console.info("type:", type);

  const getCarByType = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/type/${type}`)
      .then((response) => {
        setCarType(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetFilters = () => {
    setMotorisation("");
    setPrice("");
    setKilometer("");
  };

  useEffect(() => {
    if (type === "all") {
      setCarType([]); // making the array null
      getCars();
    } else {
      setCars([]);
      getCarByType();
    }
    resetFilters();
  }, [type]);

  const handleChange = (event) => {
    setMotorisation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleKilometerChange = (event) => {
    setKilometer(event.target.value);
  };

  const filteredCars = filterCars(cars, motorisation, price, kilometer);

  const filteredCarType = filterCars(carType, motorisation, price, kilometer);

  console.info(cars);
  console.info(carType);

  return (
    <>
      <div className="motorisation">
        <Box sx={{ maxWidth: 140 }} className="box">
          <FormControl fullWidth>
            <InputLabel id="motor-select-label">Motorisation</InputLabel>
            <Select
              labelId="motor-select-label"
              id="motor-select"
              value={motorisation}
              label="motorisation"
              onChange={handleChange}
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Petrol">Petrol</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{ maxWidth: 140 }} className="box">
          <FormControl fullWidth>
            <InputLabel id="price-select-label">Price</InputLabel>
            <Select
              labelId="price-select-label"
              id="price-select"
              value={price}
              label="price"
              onChange={handlePriceChange}
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="9999">1000 - 10000</MenuItem>
              <MenuItem value="19999">10000 - 20000</MenuItem>
              <MenuItem value="29999">20000 - 30000</MenuItem>
              <MenuItem value="30000">over 30000</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{ maxWidth: 140 }} className="box">
          <FormControl fullWidth>
            <InputLabel id="kilometer-select-label">Kilometer</InputLabel>
            <Select
              labelId="kilometer-select-label"
              id="kilometer-select"
              value={kilometer}
              label="kilometer"
              onChange={handleKilometerChange}
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="9999">1000 - 10000</MenuItem>
              <MenuItem value="19999">10000 - 20000</MenuItem>
              <MenuItem value="29999">20000 - 30000</MenuItem>
              <MenuItem value="39999">30000 - 40000</MenuItem>
              <MenuItem value="49999">40000 - 49999</MenuItem>
              <MenuItem value="59999">49999 - 59999</MenuItem>
              <MenuItem value="69999">over 60000</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {cars.length > 0 && (
        <div className="cards-result">
          {!error ? (
            filteredCars.map((car) => (
              <Link key={car.announce_id} to={`/cardetails/${car.announce_id}`}>
                <Cardcarresult key={car.announce_id} car={car} />
              </Link>
            ))
          ) : (
            <p>Aucun résultat</p>
          )}
        </div>
      )}
      {/* {filteredCars.length === 0 && <p>Aucun résultat</p>} */}

      {filteredCarType.map((car) => (
        <Link key={car.announce_id} to={`/cardetails/${car.announce_id}`}>
          <Cardcarresult key={car.announce_id} car={car} />
        </Link>
      ))}
    </>
  );
}
