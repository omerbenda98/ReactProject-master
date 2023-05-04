import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const SuperProtectedRoute = ({ element, isAdmin, isBiz }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const admin = useSelector((bigState) => bigState.authSlice.isAdmin);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const biz = useSelector((bigState) => bigState.authSlice.isBiz);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [biz, admin]);

  //* html section
  if (isLoading) {
    return <CircularProgress />;
  }
  if (isLoggedIn) {
    if ((isAdmin && payload && admin) || (isBiz && payload && biz)) {
      return element;
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default SuperProtectedRoute;
