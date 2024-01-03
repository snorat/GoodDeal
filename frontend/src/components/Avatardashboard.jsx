import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import "../styles/avatardashboard.css";
import "@mui/material/styles";

export default function Avatardashboard() {
  const userId = localStorage.getItem("id");
  const [avatar, setAvatar] = useState({});

  const getUser = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/avatar/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info("Response from getUser:", response.data);
        setAvatar({
          first_letter_of_firstname: response.data.first_letter_of_firstname,
          firstname: response.data.firstname,
        });
      })
      .catch((error) => {
        console.error("Error getting user:", error);
      });
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div>
      <div className="avatar">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            className="avatardash"
            sx={{
              width: "70px",
              height: "70px",
              fontSize: "24px",
              bgcolor: "#EBAF00",
            }}
          >
            {avatar.first_letter_of_firstname?.charAt(0)}
          </Avatar>
          <p className="text_avatar">{avatar.firstname}</p>
        </Stack>
      </div>
      <hr className="separator-line" />
    </div>
  );
}
