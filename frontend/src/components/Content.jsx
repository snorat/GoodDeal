import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AnnouncePage from "../pages/AnnouncePage";
import ResultPage from "../pages/ResultPage";
import Backoffice from "../pages/Backoffice";
import CarbrandmodelResult from "../pages/CarbrandmodelResult";
import Messages from "../pages/Messages";
import MessageDetails from "../pages/MessageDetails";
import UpdateUser from "../pages/UpdateUser";
import CarDetailPage from "../pages/CarDetailPage";
import MyAnnouncePage from "../pages/MyAnnouncePage";
import UpdateAnnounce from "../pages/UpdateAnnounce";
import Page404 from "../pages/Page404";
import Contact from "./Contact";
import MyFavorite from "../pages/MyFavorite";
import PrivateRoute from "../services/PrivateRoute";
import ExportContext from "../contexts/Context";

export default function Content() {
  const { infoUser } = useContext(ExportContext.Context);
  console.info("infouser:", infoUser.role);
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/messages"
          element={
            <PrivateRoute isAllowed={infoUser.role === "user"}>
              <Messages />
            </PrivateRoute>
          }
        />

        <Route
          path="/messages/:sender/:receiver/:announceId"
          element={<MessageDetails />}
        />
        <Route path="/cardetails/:id" element={<CarDetailPage />} />
        <Route
          path="/announce"
          element={
            <PrivateRoute isAllowed={infoUser.role === "user"}>
              <AnnouncePage />
            </PrivateRoute>
          }
        />

        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:userResearch" element={<CarbrandmodelResult />} />
        <Route path="/result/type/:type" element={<ResultPage />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        {/* <Route path="/result/:userResearch" element={<CarbrandmodelResult />} /> */}
        <Route
          path="/backoffice"
          element={
            <PrivateRoute isAllowed={infoUser.role === "user"}>
              <Backoffice />
            </PrivateRoute>
          }
        />
        <Route path="/cardetails/:id" element={<CarDetailPage />} />
        <Route path="/myannounce/:id" element={<MyAnnouncePage />} />
        <Route
          path="/updateAnnounce/:id/:announceId"
          element={<UpdateAnnounce />}
        />
        <Route path="/*" element={<Page404 />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/mesfavoris" element={<MyFavorite />} />
      </Routes>
    </section>
  );
}
