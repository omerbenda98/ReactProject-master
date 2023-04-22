import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const FavCardsPage = () => {
  const [favoriteCardsArr, setFavoriteCardsArr] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const handleFavoriteDeleteBtnClick = (id) => {
    const updatedFavoriteCardsArr = favoriteCardsArr.filter(
      (card) => card._id !== id
    );
    setFavoriteCardsArr(updatedFavoriteCardsArr);
    localStorage.setItem("favorites", JSON.stringify(updatedFavoriteCardsArr));
  };
  const isFavorite = (id) => {
    const isCardFav = favoriteCardsArr.some((card) => card._id === id);

    return isCardFav;
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

  return (
    <Box>
      <Grid container spacing={2}>
        {favoriteCardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              isFavorite={isFavorite}
              onFavoriteDelete={handleFavoriteDeleteBtnClick}
              isAdmin={isAdmin}
              userId={item.user_id}
              tokenId={getTokenId()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavCardsPage;
/*
    TODO:
    1) use user id to colect created cards into a state
 2)use map to create a new display of cards
 3)make button to lead to createCardPage
*/
