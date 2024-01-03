/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ isAllowed, children }) {
  console.info("isAllowed:", isAllowed);

  if (!isAllowed) {
    return <Navigate to="/" />;
  }
  return children;
}
