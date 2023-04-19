import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = (allCards) => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [favoriteCardsArr, setFavoriteCardsArr] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    return storedFavorites ? storedFavorites : [];
  });

  const [cardsArr, setCardsArr] = useState(null);

  let qparams = useQueryParams();
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const isFavorite = (id) => {
    const isCardFav = favoriteCardsArr.some((card) => card._id === id);
    return isCardFav;
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteCardsArr));
  }, [favoriteCardsArr]);

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              canEdit={isBiz || isAdmin}
              isFavorite={isFavorite}
              cardsArr={cardsArr}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
