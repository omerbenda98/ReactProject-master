import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import ROUTES from "../routes/ROUTES";

const MyCardsPage = () => {
  const [userData, setUserData] = useState(null);
  const [cardsArr, setCardsArr] = useState([]);

  const navigate = useNavigate();
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("cards/my-cards");
        setUserData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
  const handleNavigate = () => {
    navigate(ROUTES.CREATE);
  };
  const getTokenId = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload._id;
    return userId;
  };
  if (!isAdmin || !isBiz) {
    return <CircularProgress />;
  }
  if (!userData) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        My Cards
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {userData.map((item) => (
            <Grid
              item
              xs={10}
              md={6}
              lg={4}
              sx={{ ml: { xs: 4, lg: 0, md: 0 } }}
              key={item._id + Date.now()}
            >
              <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                cardsArr={cardsArr}
                isAdmin={isAdmin}
                userId={item.user_id}
                tokenId={getTokenId()}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <IconButton onClick={handleNavigate}>
        <AddCircleIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
      </IconButton>
    </Fragment>
  );
};
export default MyCardsPage;
