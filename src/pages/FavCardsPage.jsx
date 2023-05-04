import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const FavCardsPage = () => {
  const [cardsArr, setCardsArr] = useState([]);
  const [favoriteCardsArr, setFavoriteCardsArr] = useState([]);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

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
    axios
      .get("/cards/get-my-fav-cards")
      .then((response) => {
        setFavoriteCardsArr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
  const handleRemoveCard = (id) => {
    setFavoriteCardsArr(favoriteCardsArr.filter((card) => card._id !== id));
  };

  return (
    <Box>
      {favoriteCardsArr.length != 0 ? (
        <Grid container spacing={2}>
          {favoriteCardsArr.map((item) => (
            <Grid item xs={4} key={item._id + Date.now()}>
              <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                isAdmin={isAdmin}
                userId={item.user_id}
                tokenId={getTokenId()}
                cardsArr={cardsArr}
                onFavoriteDelete={handleRemoveCard}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" align="center">
          No favorite cards selected.
        </Typography>
      )}
    </Box>
  );
};

export default FavCardsPage;
