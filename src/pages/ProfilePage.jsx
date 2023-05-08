import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import validateProfileSchema from "../validation/profileEditValidation";

const ProfilePage = () => {
  const [inputState, setInputState] = useState({});
  const [originalInputState, setOriginalInputState] = useState({});
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/users/userInfo");
        delete data._id;
        delete data.isAdmin;
        setInputState(data);
        setOriginalInputState(data);
      } catch (err) {
        console.log("error from axios", err.response.data);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const joiResponse = validateProfileSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        toast.error("oops");
        console.log("response from joi " + JSON.stringify(joiResponse));
        return;
      }
      const { data } = await axios.put("/users/userInfo", inputState);
      setOriginalInputState(data);
      setInputState(data);
      setEditMode(false);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };

  const handleCancelEdit = () => {
    setInputState(originalInputState);
    setEditMode(false);
  };

  const handleInputChange = (ev) => {
    let newInputState = { ...inputState };
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateProfileSchema(newInputState);
    if (!joiResponse) {
      setIsDisabled(false);
      setInputsErrorsState(null);
    } else {
      setInputsErrorsState(joiResponse);
      setIsDisabled(true);
    }
  };

  const handleCheckboxChange = (ev) => {
    setInputState((prevState) => ({
      ...prevState,
      biz: ev.target.checked,
    }));
  };
  const handleResetClick = (ev) => {
    setInputState({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      biz: false,
    });
    setInputsErrorsState(null);
  };
  return (
    <Container component="main" maxWidth="xs">
      {editMode ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                id="firstName"
                label="First Name"
                autoFocus
                value={inputState.firstName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.firstName && (
                <Alert severity="warning">
                  {inputsErrorsState.firstName.map((item) => (
                    <div key={"firstName-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="middleName"
                label="middle-name"
                type="middleName"
                id="middleName"
                autoComplete="middle-name"
                value={inputState.middleName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.middleName && (
                <Alert severity="warning">
                  {inputsErrorsState.password.map((item) => (
                    <div key={"middleName-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={inputState.lastName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.lastName && (
                <Alert severity="warning">
                  {inputsErrorsState.lastName.map((item) => (
                    <div key={"lastName-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="phone"
                label="Phone"
                type="phone"
                id="phone"
                autoComplete="phone-number"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.phone && (
                <Alert severity="warning">
                  {inputsErrorsState.phone.map((item) => (
                    <div key={"phone-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
                <Alert severity="warning">
                  {inputsErrorsState.email.map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="imageUrl"
                label="ImgUrl"
                type="imageUrl"
                id="imageUrl"
                autoComplete="imageUrl"
                value={inputState.imageUrl}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imageUrl && (
                <Alert severity="warning">
                  {inputsErrorsState.imageUrl.map((item) => (
                    <div key={"imgUrl-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="imageAlt"
                label="ImgAlt"
                type="imageAlt"
                id="imageAlt"
                autoComplete="imageAlt"
                value={inputState.imageAlt}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imageAlt && (
                <Alert severity="warning">
                  {inputsErrorsState.imageAlt.map((item) => (
                    <div key={"imgAlt-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="state"
                label="State"
                type="state"
                id="state"
                autoComplete="state"
                value={inputState.state}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.state && (
                <Alert severity="warning">
                  {inputsErrorsState.state.map((item) => (
                    <div key={"state-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="country"
                label="Country"
                type="country"
                id="country"
                autoComplete="country"
                value={inputState.country}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.country && (
                <Alert severity="warning">
                  {inputsErrorsState.country.map((item) => (
                    <div key={"country-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="city"
                label="City"
                type="city"
                id="city"
                autoComplete="city"
                value={inputState.city}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.city && (
                <Alert severity="warning">
                  {inputsErrorsState.city.map((item) => (
                    <div key={"city-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="street"
                label="Street"
                type="street"
                id="street"
                autoComplete="street"
                value={inputState.street}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.street && (
                <Alert severity="warning">
                  {inputsErrorsState.street.map((item) => (
                    <div key={"street-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="houseNumber"
                label="HouseNumber"
                type="houseNumber"
                id="houseNumber"
                autoComplete="houseNumber"
                value={inputState.houseNumber}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.houseNumber && (
                <Alert severity="warning">
                  {inputsErrorsState.houseNumber.map((item) => (
                    <div key={"houseNumber-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="zipCode"
                label="ZipCode"
                type="zipCode"
                id="zipCode"
                autoComplete="zipCode"
                value={inputState.zipCode}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.zipCode && (
                <Alert severity="warning">
                  {inputsErrorsState.zipCode.map((item) => (
                    <div key={"zipCode-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inputState.biz}
                    onChange={handleCheckboxChange}
                    name="biz"
                    color="primary"
                  />
                }
                label="Signup as business"
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSaveProfile}
            disabled={isDisabled}
          >
            SAVE
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleResetClick}
          >
            RESET
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        // render read-only display of user information
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box sx={{ p: 3, mt: 3, maxWidth: 400 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Personal Information
              </Typography>
              <Typography>
                Name: {inputState.firstName} {inputState.lastName}
              </Typography>
              <Typography>Email: {inputState.email}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Account Information
              </Typography>

              <Typography>
                Business Account: {inputState.biz ? "Yes" : "No"}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Shipping Information
              </Typography>
              <Typography>Address: {inputState.address}</Typography>
              <Typography>Country: {inputState.country}</Typography>
              <Typography>State: {inputState.state}</Typography>
              <Typography>City: {inputState.city}</Typography>
              <Typography>Street: {inputState.street}</Typography>
              <Typography>House Number: {inputState.houseNumber}</Typography>
              <Typography>Zip Code: {inputState.zipCode}</Typography>
            </Box>
            <Button variant="contained" onClick={handleEditProfile}>
              Edit
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;
