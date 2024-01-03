import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/searchBar.css";

export default function SearchBar() {
  const [userResearch, setUserResearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/result/${userResearch}`);
    setUserResearch(""); // clear the input value after submitting
  };

  const handleSearch = (event) => {
    setUserResearch(event.target.value);
  };

  return (
    <form className="search_bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={userResearch}
        placeholder="Chercher un véhicule..."
        onChange={handleSearch}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}
