import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
  text-align: center;
  padding: 100px;
`;

const Image404 = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;

  @media (min-width: 640px) {
    max-width: 40%;
  }
`;

export default function Page404() {
  return (
    <NotFoundWrapper>
      <Image404 src="src/assets/images/404.png" alt="Lapage404" />

      <h1 style={{ color: "#ff0000" }}>Oops! Page non trouvée</h1>
      <p>La page que vous recherchez semble introuvable.</p>
      <Link to="/">Retour à la page d'accueil</Link>
    </NotFoundWrapper>
  );
}
