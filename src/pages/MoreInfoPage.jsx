import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import axios from "axios";

const MoreInfoPage = () => {
  const { id } = useParams();

  const [cardInfo, setCardInfo] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/card/" + id);
        setCardInfo(data);
      } catch (err) {
        console.log("err from axios", err);
      }
    })();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "50%", maxWidth: "700px", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: "1rem" }}>
            {cardInfo.title}{" "}
            <a
              href={cardInfo.image.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={cardInfo.image.url}
                alt={cardInfo.image.alt}
                sx={{ width: "100%" }}
              />
            </a>
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
            component="h3"
            sx={{ mb: "1rem" }}
          >
            {cardInfo.subTitle}
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: "2rem" }}>
            {cardInfo.description}
          </Typography>
          <Divider></Divider>
          <Typography variant="body1" component="p" sx={{ mt: 3 }}>
            for more info
          </Typography>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            sx={{ mb: "1rem" }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>
        {expanded && (
          <CardContent>
            <Typography variant="h6" component="h2" sx={{ mb: "0.5rem" }}>
              Address
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: "1rem" }}>
              {`${cardInfo.street} ${cardInfo.houseNumber}, ${cardInfo.city}, ${cardInfo.state}, ${cardInfo.zipCode}, ${cardInfo.country}`}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: "0.5rem" }}>
              Contact
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: "0.5rem" }}>
              {`Phone: ${cardInfo.phone}`}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: "0.5rem" }}>
              {`Email: ${cardInfo.email}`}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: "1rem" }}>
              {`Web: ${cardInfo.web}`}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default MoreInfoPage;
