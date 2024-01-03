import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExportContext from "../contexts/Context";
// import MessageCard from "../components/MessageCard";
// import MessageImage from "../components/MessageImage";

export default function Messages() {
  const [data, setData] = useState([]);
  const { infoUser } = useContext(ExportContext.Context);
  const navigate = useNavigate();

  // const userId = localStorage.getItem("id");

  console.info("id", infoUser.id);

  const getAllConversations = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/messages/${infoUser.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/"); // if unauthorised user then it goes to homepage
      });
  };

  console.info(data);

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <div className="msg_list">
      <h1>Mes Messages</h1>
      {data.map((contact) => (
        <div className="conversation_list">
          <div className="carimage">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/uploads/${
                contact.Image
              }`}
              alt=""
            />
          </div>
          <div className="cardetails-messages">
            <h5>{contact.AnnTitle}</h5>
            <h5>€ {contact.Price}</h5>
            <h5>
              {contact.userFname} - {contact.lastMessageTime}
            </h5>
          </div>
          {/* <MessageCard contact={contact} /> */}
          <Link
            key={contact.userId}
            to={`/messages/${infoUser.id}/${contact.userId}/${contact.AnnounceId}`}
          >
            Voir la conversation
          </Link>
        </div>
      ))}
    </div>
  );
}
