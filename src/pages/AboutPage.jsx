import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import atom from "../logo.svg";
const AboutUsPage = () => {
  const exampleCard = {
    img: "https://images.unsplash.com/photo-1682001426601-c7fdc9ea5b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    title: "Example Card",
    subTitle: "Subtitle",
    description:
      "This is an example card to demonstrate how to use each card component.",
    isFav: false,
    isAdmin: false,
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our website! We're here to provide you with an amazing card
          collection experience.
        </Typography>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          Our website offers the following key features:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Homepage:</strong> On the homepage, you can explore and
              view all the available cards in our collection.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>My Cards:</strong> The My Cards page allows you to view
              the cards you have created. Only the cards you own will be
              displayed here.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Favorite Cards:</strong> You can mark your favorite cards
              and access them easily on the Favorite Cards page.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>CRM:</strong> The CRM (Customer Relationship Management)
              page is accessible to admins. Here, admins can update user roles,
              specifically changing regular users to business users.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>User Roles:</strong> Users can have different roles -
              Regular, Business, or Admin. Business users can edit and delete
              only their own cards, while admins have the ability to delete all
              cards and manage non-admin users in the CRM.
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" paragraph>
          We hope you enjoy using our website and have a great time exploring
          the card collection!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Example Card
        </Typography>
        <Card sx={{ maxWidth: 710, ml: 10 }}>
          <CardMedia
            component="img"
            height="340"
            image={exampleCard.img}
            alt="Example Card"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {exampleCard.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {exampleCard.subTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {exampleCard.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              ml: "auto",
            }}
          >
            <Tooltip title="Contact">
              <IconButton>
                <PhoneIcon />
                <Typography>
                  {" "}
                  Click on the <strong>Contact</strong> button to view the
                  business card user's contact information.
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon />{" "}
                <Typography>
                  {" "}
                  Click on the <strong>Edit</strong> button to edit the selected
                  card.
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
                <Typography>
                  {" "}
                  Click on the <strong>Delete</strong> button to delete the
                  business card.
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorite">
              <IconButton>
                {exampleCard.isFav ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
                <Typography>
                  Click on the <strong>Favorite</strong> button to mark the card
                  as a favorite and add it to the favorite page.
                </Typography>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
