import { Link } from "react-router-dom";
import { FaUser, FaStar } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import Avatardashboard from "../components/Avatardashboard";

export default function Backoffice() {
  return (
    <>
      <Avatardashboard />
      <div className="backoffice_content">
        <div className="card_backoffice">
          <Link to="/updateUser">
            <div className="favoris-icon">
              <FaUser size={40} />
            </div>
            <h1>Mon Profil</h1>

            <p>Modifier mon profil</p>
          </Link>
        </div>
        <div className="card_backoffice">
          <Link to="/mesfavoris">
            <div className="favoris-icon">
              <FaStar size={40} />
            </div>
            <h1>Mes Favoris</h1>
            <p>Gérer mes favoris</p>
          </Link>
        </div>

        <div className="card_backoffice">
          <Link to="/myannounce/:id">
            <div className="favoris-icon">
              <MdAnnouncement size={40} />
            </div>

            <h1>Mes Annonces</h1>
            <p>Gérer mes annonces</p>
          </Link>
        </div>
      </div>
    </>
  );
}
