/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/carbrandmodelresult.css";

import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import filterCars from "../services/carFilterServices";
import Cardcarresult from "../components/Cardcarresult";

export default function CarbrandmodelResult() {
  const [data, setData] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [errorModel, setErrorModel] = useState(false);
  const [dataBrand, setDataBrand] = useState([]);
  const [errorBrand, setErrorBrand] = useState(false);
  const [motorisation, setMotorisation] = useState("");
  const [price, setPrice] = useState("");
  const [kilometer, setKilometer] = useState("");
  const { userResearch } = useParams();
  // const { userSearch } = useParams();
  // const [searchType, setSearchType] = useState("");

  const handleChange = (event) => {
    setMotorisation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleKilometerChange = (event) => {
    setKilometer(event.target.value);
  };

  const filteredBrandCars = filterCars(
    dataBrand,
    motorisation,
    price,
    kilometer
  );
  const filteredModelCars = filterCars(
    dataModel,
    motorisation,
    price,
    kilometer
  );
  const filteredSearchCars = filterCars(data, motorisation, price, kilometer);

  const searchModel = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/model/${userResearch}`)
      .then((response) => {
        console.info(response.data);
        setDataModel(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorModel(true);
      });
  };
  const searchBrand = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/brand/${userResearch}`)
      .then((response) => {
        console.info(response.data);
        setDataBrand(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorBrand(true);
      });
  };

  const searchCars = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/announce/search/${userResearch}`
      )
      .then((response) => {
        console.info(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.info("userResearch:", userResearch);

  useEffect(() => {
    if (userResearch === "") {
      searchModel();
    }
    if (userResearch === "") {
      searchBrand();
    } else {
      searchCars();
    }
  }, [userResearch]);

  // useEffect(() => {
  //   searchModel();
  //   searchBrand();
  //   searchCars();
  // }, [userResearch]);

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
      {console.info("filteredModelCars:", filteredModelCars.length)}
      {dataModel.length > 0 && dataModel[0].car_model_name === userResearch && (
        <div className="model_results">
          <h2>
            {filteredModelCars.length > 0
              ? `Nous avons trouvé ${dataModel.length} résultat pour ${userResearch}`
              : `Nous avons trouvé ${filteredModelCars.length} résultats pour ${userResearch}`}
          </h2>
          <div className="model_list">
            {!errorModel ? (
              filteredModelCars.map((car) => (
                <Link
                  key={car.announce_id}
                  to={`/cardetails/${car.announce_id}`}
                >
                  <Cardcarresult key={car.announce_id} car={car} />
                </Link>
              ))
            ) : (
              <p>Aucun résultat</p>
            )}
            {/* {filteredModelCars.length === 0 && <p>Aucun résultat</p>} */}
          </div>
        </div>
      )}
      {dataBrand.length > 0 && dataBrand[0].car_brand_name === userResearch && (
        <div className="brand_results">
          <h2>
            {filteredBrandCars.length > 0
              ? `Nous avons trouvé ${dataBrand.length} résultat pour ${userResearch}`
              : `Nous avons trouvé ${filteredBrandCars.length} résultats pour ${userResearch}`}
          </h2>
          <div className="model_list">
            {!errorBrand ? (
              filteredBrandCars.map((brandCar) => (
                <Link
                  key={brandCar.announce_id}
                  to={`/cardetails/${brandCar.announce_id}`}
                >
                  <Cardcarresult key={brandCar.id} car={brandCar} />
                </Link>
              ))
            ) : (
              <p>Aucun résultat</p>
            )}
            {/* {filteredBrandCars.length === 0 && <p>Aucun résultat</p>} */}
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="car_results">
          <h2>
            {filteredSearchCars.length > 0
              ? `Nous avons trouvé ${data.length} résultat pour ${userResearch}`
              : `Nous avons trouvé ${filteredSearchCars.length} résultats pour ${userResearch}`}
          </h2>
          <div>
            {filteredSearchCars.map((car) => (
              <Link key={car.announce_id} to={`/cardetails/${car.announce_id}`}>
                <Cardcarresult key={car.announce_id} car={car} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* {data.length > 0 && (
        <div className="car_results">
          <h2>
            {filteredSearchCars.length > 0
              ? `Nous avons trouvé ${data.length} résultat pour ${userResearch}`
              : `Nous avons trouvé ${filteredSearchCars.length} résultats pour ${userResearch}`}
          </h2>
          <div className="car_list">
            {!error ? (
              filteredSearchCars.map((car) => (
                <Link
                  key={car.announce_id}
                  to={`/cardetails/${car.announce_id}`}
                >
                  <Cardcarresult key={car.announce_id} car={car} />
                </Link>
              ))
            ) : (
              <p>Aucun résultat</p>
            )}
          </div>
        </div>
      )} */}
    </>
  );
}
