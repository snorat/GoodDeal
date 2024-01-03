import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import MessageContent from "../components/MessageContent";
// import Cardcarresult from "../components/Cardcarresult";

export default function MessageDetails() {
  const { sender, receiver } = useParams();
  const [cars, setCars] = useState([]);
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const { announceId } = useParams();

  const getCars = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/announce/${announceId}`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getCars();
  }, [announceId]);
  console.info("announcdID:", announceId);

  const getConversation = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/messages/sender/${sender}/receiver/${receiver}/${announceId}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setData(response.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/sendmessage`, {
        announce_id: 3,
        sender_user_id: sender,
        receiver_user_id: receiver,
        content,
      })
      .then((response) => {
        console.info(response);
        setContent(""); // Reset the form after successful submission
        console.info("Content cleared:", content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMessage = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(event);
    } else {
      setContent(event.target.value);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getConversation();
    }, 3000);
    return () => clearInterval(interval);
  }, [announceId]);

  console.info(data);

  return (
    <>
      <div className="conversation">
        <h1>Conversation</h1>
        {cars.map((car) => (
          <Link to={`/cardetails/${car.announce_id}`}>
            <div key={car.id} className="conversation_user">
              <div className="carimage">
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/images/uploads/${car.image_1}`}
                  alt=""
                />
              </div>
              <div className="cardetails-messages">
                <h5>{car.title}</h5>
                <h5>€ {car.price}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {data.map((message) => (
        <div key={message.id}>
          <MessageContent key={message.id} message={message} sender={sender} />
        </div>
      ))}
      <form className="message_text" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Écrivez ici..."
          value={content}
          onChange={handleMessage}
        />

        <button id="sendmessage" type="submit">
          <SendIcon />
        </button>
      </form>
    </>
  );
}
