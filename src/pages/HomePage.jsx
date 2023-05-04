import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import MoreInfoPage from "./MoreInfoPage";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  let qparams = useQueryParams();
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  console.log(isBiz);
  console.log(isAdmin);
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
  const getTokenId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload._id;
    return userId;
  };

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

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
          Welcome to MyApp!
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 2 }}>
          Explore and discover amazing content.
        </Typography>
      </Box>

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
              cardsArr={cardsArr}
              userId={item.user_id}
              tokenId={getTokenId()}
              onClick={() => setSelectedCard(item)}
            />
          </Grid>
        ))}
        {selectedCard && (
          <MoreInfoPage
            title={selectedCard.title}
            subTitle={selectedCard.subTitle}
            description={selectedCard.description}
            state={selectedCard.state}
            country={selectedCard.country}
            city={selectedCard.city}
            street={selectedCard.street}
            houseNumber={selectedCard.houseNumber}
            zipCode={selectedCard.zipCode}
            phone={selectedCard.phone}
            email={selectedCard.email}
            web={selectedCard.web}
            url={selectedCard.url}
            alt={selectedCard.alt}
          />
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
