import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ExportContext from "../contexts/Context";
import "../styles/backoffice.css";
import Avatardashboard from "../components/Avatardashboard";

export default function UpdateUser() {
  const [selectedUser, setSelectedUser] = useState({
    user_id: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const { infoUser } = useContext(ExportContext.Context);
  const navigate = useNavigate();

  const getUser = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/${infoUser.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info("Response from getUser:", response.data);
        setSelectedUser({
          user_id: response.data.user_id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error("Error getting user:", error);
        navigate("/");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios

      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/${infoUser.id}`,
        selectedUser
      )
      .then((response) => {
        toast.success("User updated successfully!");
        console.info("Response from updateUser:", response.data);
      })
      .catch((error) => {
        toast.error("Error updating user!");
        console.error("Error updating user:", error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.info(selectedUser);
  }, [selectedUser]);

  return (
    <div className="update_user_panel">
      <Avatardashboard />
      <ToastContainer />
      {selectedUser && (
        <form className="user-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="firstname">Nom</label>
            <input
              type="text"
              placeholder={selectedUser.firstname}
              value={selectedUser.firstname}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  firstname: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="lastname">Prénom</label>
            <input
              type="text"
              placeholder={selectedUser.lastname}
              value={selectedUser.lastname}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  lastname: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder={selectedUser.email}
              value={selectedUser.email}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  email: event.target.value,
                })
              }
            />
          </div>
          <button type="submit"> Enregistrer les modifications </button>
        </form>
      )}
    </div>
  );
}
