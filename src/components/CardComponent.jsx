import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState, useEffect, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  id,
  isFavorite,
  cardsArr,
  tokenId,
  userId,
}) => {
  const [isFav, setIsFav] = useState(isFavorite(id));
  const [myCardsArr, setCardsArr] = useState(cardsArr);
  const [favoriteCardsArr, setFavoriteCardsArr] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    return storedFavorites ? storedFavorites : [];
  });
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isCardFav = isFavorite(id);
  const navigate = useNavigate();

  const bizAdminCardLayout = () => {
    if (userId === tokenId) {
      return true;
    } else {
      return false;
    }
  };
  const handleDeleteBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  const handleEditBtnClick = () => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };
  const handleFavoriteBtnClick = () => {
    if (!isCardFav) {
      setIsFav(true);
      console.log(cardsArr);
      const newFavoriteCard = cardsArr.find((card) => card._id === id);
      const updatedFavoriteCardsArr = [...favoriteCardsArr, newFavoriteCard];
      setFavoriteCardsArr(updatedFavoriteCardsArr);
    } else {
      setIsFav(false);
      const updatedFavoriteCardsArr = favoriteCardsArr.filter(
        (card) => card._id !== id
      );
      setFavoriteCardsArr(updatedFavoriteCardsArr);
    }
  };
  useEffect(() => {
    bizAdminCardLayout();
    localStorage.setItem("favorites", JSON.stringify(favoriteCardsArr));
  }, [favoriteCardsArr]);

  // try {
  //   const response = await axios.patch(`cards/card-like/${id}`, {
  //     cardData: newFavoriteCard,
  //   });

  // } catch (err) {
  //   console.log("err", err);
  //   toast.error("errrrrrrrrrrrrrrrror");
  // }
  // };
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Phone">
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </Tooltip>
        {isFav ? (
          <Tooltip title="FavoriteSelected">
            <IconButton onClick={handleFavoriteBtnClick}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Favorite">
            <IconButton onClick={handleFavoriteBtnClick}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}

        {isAdmin && (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {bizAdminCardLayout() && (
          <Fragment>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditBtnClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onFavorite: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
