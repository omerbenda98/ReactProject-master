import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBiz }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const admin = useSelector((bigState) => bigState.authSlice.isAdmin);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const biz = useSelector((bigState) => bigState.authSlice.isBiz);

  //* html section
  if (isLoggedIn) {
    if ((isAdmin && payload && admin) || (isBiz && payload && biz)) {
      return element;
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default SuperProtectedRoute;
