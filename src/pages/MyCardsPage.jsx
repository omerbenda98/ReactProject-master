import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
//need to change favorite. does not update local storage.
const MyCardsPage = (allCards) => {
  // const [myCardsArr, setmyCardsArr] = useState(allCards);
  const [userData, setUserData] = useState(null);
  const [favoriteCardsArr, setFavoriteCardsArr] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    return storedFavorites ? storedFavorites : [];
  });

  // const handleFavoriteDeleteBtnClick = (id) => {
  //   const updatedFavoriteCardsArr = favoriteCardsArr.filter(
  //     (card) => card._id !== id
  //   );
  //   setFavoriteCardsArr(updatedFavoriteCardsArr);
  //   localStorage.setItem("favorites", JSON.stringify(updatedFavoriteCardsArr));
  // };

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
  const isFavorite = (id) => {
    const isCardFav = favoriteCardsArr.some((card) => card._id === id);

    return isCardFav;
  };

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
                isFavorite={isFavorite}
                cardsArr={allCards}
                canEdit={true}
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
/*
    TODO:
    1) use user id to colect created cards into a state
 2)use map to create a new display of cards
 3)make button to lead to createCardPage
*/
