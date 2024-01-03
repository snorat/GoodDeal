import React from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./styles/app.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
