import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const MyCardsPage = () => {
  const [userData, setUserData] = useState(null);
  const [cardsArr, setCardsArr] = useState([]);

  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  console.log(isAdmin);
  console.log(isBiz);
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
      <h1>My Cards</h1>
      <Box>
        <Grid container spacing={2}>
          {userData.map((item) => (
            <Grid item xs={4} key={item._id + Date.now()}>
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

      <IconButton>
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
