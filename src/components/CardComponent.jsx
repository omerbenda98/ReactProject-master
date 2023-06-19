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
import { Fragment, useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  id,
  cardsArr,
  tokenId,
  userId,
  onDelete,
  onFavoriteDelete,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [myCardsArr, setCardsArr] = useState(cardsArr);

  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const navigate = useNavigate();

  const bizAdminCardLayout = () => {
    if (userId === tokenId) {
      return true;
    } else {
      return false;
    }
  };
  const isFavorite = () => {
    const currentCard = cardsArr.find((card) => card._id === id);
    if (
      currentCard &&
      currentCard.likes &&
      currentCard.likes.filter((item) => item === tokenId).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditBtnClick = () => {
    navigate(`/edit/${id}`);
  };
  const handleMoreInfoClick = () => {
    navigate(`/moreInfo/${id}`);
  };
  const handleDeleteBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      onDelete(id);
      toast.success("Card Deleted");
    } catch (err) {
      toast.error("Error, can delete card");
      console.log("error when deleting", err.response.data);
    }
  };
  const handleFavoriteBtnClick = async () => {
    setIsFav(true);
    try {
      const newFavoriteCard = cardsArr.find((card) => card._id === id);
      const updatedLikes = [...newFavoriteCard.likes, userId];
      await axios.patch(`cards/card-like/${id}`, { likes: updatedLikes });
      toast.success("Card added to favorites");
    } catch (error) {
      console.error("Failed to update card likes", error);
      toast.error("Error, can not add card");
    }
  };
  const handleFavoriteDeleteBtnClick = async () => {
    setIsFav(false);
    onFavoriteDelete(id);
    try {
      const newFavoriteCard = cardsArr.find((card) => card._id === id);
      const updatedLikes = newFavoriteCard.likes.filter(
        (like) => like !== userId
      );

      await axios.patch(`cards/card-like/${id}`, { likes: updatedLikes });
      toast.success("Card removed from favorites");
    } catch (error) {
      console.error("Failed to update card likes", error);
      toast.error("Error, can not remove card");
    }
  };

  useEffect(() => {
    setIsFav(isFavorite());
  }, []);

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
        <Tooltip title="Contact">
          <IconButton onClick={handleMoreInfoClick}>
            <PhoneIcon />
          </IconButton>
        </Tooltip>
        {isFav ? (
          <Tooltip title="Remove From Favorites">
            <IconButton onClick={handleFavoriteDeleteBtnClick}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add Favorite">
            <IconButton onClick={handleFavoriteBtnClick}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}

        {(bizAdminCardLayout() || isAdmin) && (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteBtnClick(id)}>
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
