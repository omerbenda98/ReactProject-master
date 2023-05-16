import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";

const UserInfoPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const currentUser = location.state;

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", textAlign: "center" }}
    >
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
              Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography>Email: {user.email}</Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Account Information
            </Typography>

            <Typography>Business Account: {user.biz ? "Yes" : "No"}</Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Shipping Information
            </Typography>
            <Typography>Address: {user.address}</Typography>
            <Typography>Country: {user.country}</Typography>
            <Typography>State: {user.state}</Typography>
            <Typography>City: {user.city}</Typography>
            <Typography>Street: {user.street}</Typography>
            <Typography>House Number: {user.houseNumber}</Typography>
            <Typography>Zip Code: {user.zipCode}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserInfoPage;
