import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

/* toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import FooterComponent from "./components/FooterComponent";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import useAdmin from "./hooks/useAdmin";
import useBiz from "./hooks/useBiz";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [biz, setBiz] = useState(null);
  const [admin, setAdmin] = useState(null);
  const loggedIn = useLoggedIn();
  const isAdmin = useAdmin();
  const isBiz = useBiz();

  useEffect(() => {
    setAdmin(isAdmin());
    setBiz(isBiz());
    loggedIn();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <MuiNavbar />
        </header>
        <main>
          <Router />
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
