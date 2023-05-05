import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import AboutPage from "../pages/AboutPage";
import MyCardsPage from "../pages/MyCardsPage";
import FavCardsPage from "../pages/FavCardsPage";
import SandboxPage from "../pages/SandboxPage";
import CreateCardPage from "../pages/CreateCardPage";
import CRMpage from "../pages/CRMpage";
import RP1 from "../pages/RP1";
import RP2 from "../pages/RP2";
import { useEffect, useState } from "react";
import axios from "axios";
import MoreInfoPage from "../pages/MoreInfoPage";

//element={<ProtectedRoute element={<LogoutPage />} />}

const Router = () => {
  // const [allCards, setAllCards] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/cards/cards")
  //     .then((response) => {
  //       setAllCards(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path="/moreInfo/:id" element={<MoreInfoPage />} />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<MyCardsPage />}
          />
        }
      />
      <Route path={ROUTES.FAVCARDS} element={<FavCardsPage />} />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<SandboxPage />}
          />
        }
      >
        <Route path={`${ROUTES.SANDBOX}/RP1`} element={<RP1 />} />
        <Route path={`${ROUTES.SANDBOX}/RP2`} element={<RP2 />} />
      </Route>
      <Route
        path={ROUTES.CRM}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<CRMpage />}
          />
        }
      ></Route>
      <Route path={ROUTES.CREATE} element={<CreateCardPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
